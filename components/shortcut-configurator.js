'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_SHORTCUT = { ctrlKey: true, shiftKey: true, key: 'k' };
const STORAGE_KEY = 'prompty:shortcut';

function isMac() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
}

function shortcutToString(shortcut) {
  if (!shortcut) return '';
  const parts = [];
  const mac = isMac();
  if (shortcut.ctrlKey) parts.push(mac ? '⌘' : 'Ctrl');
  if (shortcut.altKey) parts.push(mac ? '⌥' : 'Alt');
  if (shortcut.shiftKey) parts.push(mac ? '⇧' : 'Shift');
  if (shortcut.key && shortcut.key !== 'Control' && shortcut.key !== 'Shift' && shortcut.key !== 'Alt' && shortcut.key !== 'Meta') {
    parts.push(shortcut.key.length === 1 ? shortcut.key.toUpperCase() : shortcut.key);
  }
  return parts.join(' + ');
}

function shortcutFromStorage() {
  if (typeof window === 'undefined') return DEFAULT_SHORTCUT;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_SHORTCUT;
}

function saveShortcut(shortcut) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcut));
}

export { shortcutFromStorage, shortcutToString, saveShortcut, DEFAULT_SHORTCUT, STORAGE_KEY };

export default function ShortcutConfigurator({ open, onClose, onShortcutChange }) {
  const [shortcut, setShortcut] = useState(DEFAULT_SHORTCUT);
  const [recording, setRecording] = useState(false);
  const [pendingKeys, setPendingKeys] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    setShortcut(shortcutFromStorage());
  }, [open]);

  useEffect(() => {
    if (!recording) return;

    const handler = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Wait for a real key (not just modifier)
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) {
        setPendingKeys({
          ctrlKey: e.ctrlKey || e.metaKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          key: null,
        });
        return;
      }

      const newShortcut = {
        ctrlKey: e.ctrlKey || e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        key: e.key.toLowerCase(),
      };

      // Must have at least one modifier
      if (!newShortcut.ctrlKey && !newShortcut.altKey && !newShortcut.shiftKey) {
        return;
      }

      setPendingKeys(null);
      setShortcut(newShortcut);
      saveShortcut(newShortcut);
      setRecording(false);
      onShortcutChange?.(newShortcut);
    };

    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [recording, onShortcutChange]);

  // Close on Escape (when not recording)
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape' && !recording) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, recording, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!open) return null;

  const displayKeys = shortcutToString(shortcut);
  const pendingDisplay = pendingKeys ? shortcutToString(pendingKeys) : null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ animation: 'fade-in 0.2s ease-out' }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md mx-4 rounded-3xl bg-[#0c0c0c] border border-white/10 shadow-[0_30px_100px_rgba(168,85,247,0.25),0_0_0_1px_rgba(168,85,247,0.1)] overflow-hidden"
        style={{ animation: 'modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Top glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#a855f7]/10 to-transparent pointer-events-none" />

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="text-lg">⌨️</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Shortcut Key</h2>
                <p className="text-xs text-[#888888]">Optimize prompts instantly</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#666666] hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              ✕
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-[#a0a0a0] leading-relaxed mb-8">
            Press your shortcut key anywhere on the site while a text field is focused. Your prompt will be
            <span className="text-[#a855f7] font-semibold"> instantly compressed</span> and optimized for fewer tokens.
          </p>

          {/* Current Shortcut Display */}
          <div className="mb-8">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-3">
              Current Shortcut
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center justify-center gap-2 py-5 rounded-2xl bg-black/60 border border-white/10">
                {displayKeys.split(' + ').map((key, i, arr) => (
                  <span key={i} className="flex items-center gap-2">
                    <kbd className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-sm font-bold shadow-[0_2px_0_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]">
                      {key}
                    </kbd>
                    {i < arr.length - 1 && (
                      <span className="text-[#666666] text-xs font-bold">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Record Button */}
          <button
            onClick={() => {
              setRecording(!recording);
              setPendingKeys(null);
            }}
            className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
              recording
                ? 'bg-[#a855f7]/20 border-2 border-[#a855f7] text-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {recording ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
                {pendingDisplay || 'Press your desired shortcut...'}
              </span>
            ) : (
              'Record New Shortcut'
            )}
          </button>

          {/* Reset to default */}
          <button
            onClick={() => {
              setShortcut(DEFAULT_SHORTCUT);
              saveShortcut(DEFAULT_SHORTCUT);
              onShortcutChange?.(DEFAULT_SHORTCUT);
            }}
            className="w-full mt-3 py-2.5 text-xs text-[#666666] hover:text-[#a855f7] transition-colors font-medium"
          >
            Reset to default ({shortcutToString(DEFAULT_SHORTCUT)})
          </button>

          {/* Footer tip */}
          <div className="mt-6 p-4 rounded-xl bg-[#a855f7]/5 border border-[#a855f7]/10">
            <p className="text-[11px] text-[#888888] leading-relaxed">
              <span className="text-[#a855f7] font-bold">Tip:</span> Focus any text input on the site, then press your shortcut.
              The prompt will be compressed through Prompty's 4-phase engine and the optimized version replaces the original text instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
