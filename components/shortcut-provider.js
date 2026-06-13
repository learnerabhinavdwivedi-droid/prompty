'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import ShortcutConfigurator, { shortcutFromStorage, shortcutToString } from './shortcut-configurator';
import ShortcutToast from './shortcut-toast';

const ShortcutContext = createContext({
  openConfigurator: () => {},
  shortcutLabel: '',
  isCompressing: false,
});

export function useShortcut() {
  return useContext(ShortcutContext);
}

export default function ShortcutProvider({ children }) {
  const [shortcut, setShortcut] = useState(null);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStats, setToastStats] = useState(null);
  const shortcutRef = useRef(null);

  // Load shortcut from storage
  useEffect(() => {
    const s = shortcutFromStorage();
    setShortcut(s);
    shortcutRef.current = s;
  }, []);

  // Compress the focused element's text
  const compressFocused = useCallback(async () => {
    const el = document.activeElement;
    if (!el) return;

    // Work with textarea, input[type=text], or contenteditable
    let text = '';
    let isContentEditable = false;

    if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type === 'text')) {
      // If there's a selection, compress only the selection
      const start = el.selectionStart;
      const end = el.selectionEnd;
      if (start !== end) {
        text = el.value.substring(start, end);
      } else {
        text = el.value;
      }
    } else if (el.isContentEditable) {
      text = el.innerText;
      isContentEditable = true;
    } else {
      return; // Not a text input
    }

    if (!text || text.trim().length < 20) return; // Too short to compress

    setIsCompressing(true);

    try {
      const res = await fetch('/api/compress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setToastMessage(err.error || 'Compression failed');
        setToastStats(null);
        setToastVisible(true);
        return;
      }

      const data = await res.json();

      if (!data.compressed || data.compressed === text.trim()) {
        setToastMessage('Already optimized — no changes needed');
        setToastStats(null);
        setToastVisible(true);
        return;
      }

      // Replace text in the element
      if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type === 'text')) {
        const start = el.selectionStart;
        const end = el.selectionEnd;

        if (start !== end) {
          // Replace only the selection
          const before = el.value.substring(0, start);
          const after = el.value.substring(end);
          el.value = before + data.compressed + after;
        } else {
          el.value = data.compressed;
        }

        // Trigger React's onChange
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement?.prototype || window.HTMLInputElement?.prototype,
          'value'
        )?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(el, el.value);
        }

        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (isContentEditable) {
        el.innerText = data.compressed;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Show toast
      setToastMessage('Prompt Optimized!');
      setToastStats(data.stats);
      setToastVisible(true);
    } catch (err) {
      setToastMessage('Network error — try again');
      setToastStats(null);
      setToastVisible(true);
    } finally {
      setIsCompressing(false);
    }
  }, []);

  // Global keydown listener
  useEffect(() => {
    const handler = (e) => {
      const s = shortcutRef.current;
      if (!s || !s.key) return;

      // Don't fire when configurator is open
      if (configuratorOpen) return;

      const ctrlMatch = s.ctrlKey ? (e.ctrlKey || e.metaKey) : true;
      const shiftMatch = s.shiftKey ? e.shiftKey : !e.shiftKey;
      const altMatch = s.altKey ? e.altKey : !e.altKey;
      const keyMatch = e.key.toLowerCase() === s.key.toLowerCase();

      if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
        e.preventDefault();
        e.stopPropagation();
        compressFocused();
      }
    };

    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [compressFocused, configuratorOpen]);

  const openConfigurator = useCallback(() => setConfiguratorOpen(true), []);
  const closeConfigurator = useCallback(() => setConfiguratorOpen(false), []);

  const handleShortcutChange = useCallback((newShortcut) => {
    setShortcut(newShortcut);
    shortcutRef.current = newShortcut;
  }, []);

  return (
    <ShortcutContext.Provider
      value={{
        openConfigurator,
        shortcutLabel: shortcut ? shortcutToString(shortcut) : '',
        isCompressing,
      }}
    >
      {children}

      {/* Configurator Modal */}
      <ShortcutConfigurator
        open={configuratorOpen}
        onClose={closeConfigurator}
        onShortcutChange={handleShortcutChange}
      />

      {/* Toast Notification */}
      <ShortcutToast
        message={toastMessage}
        stats={toastStats}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />

      {/* Loading overlay indicator */}
      {isCompressing && (
        <div className="fixed bottom-8 right-8 z-[9999]">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0c0c0c]/95 border border-[#a855f7]/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-2xl">
            <div className="w-4 h-4 rounded-full border-2 border-[#a855f7] border-t-transparent animate-spin" />
            <span className="text-xs font-bold text-white">Optimizing prompt...</span>
          </div>
        </div>
      )}
    </ShortcutContext.Provider>
  );
}
