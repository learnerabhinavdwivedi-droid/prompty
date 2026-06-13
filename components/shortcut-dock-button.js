'use client';

import { useShortcut } from './shortcut-provider';

// Keyboard SVG Icon — 3D style matching the dock aesthetic
const KeyboardIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="kb-bg" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#3b0764" />
      </linearGradient>
      <linearGradient id="kb-key" x1="0" y1="0" x2="0" y2="8">
        <stop offset="0%" stopColor="#e9d5ff" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    {/* Keyboard body */}
    <rect x="4" y="9" width="24" height="14" rx="3" fill="url(#kb-bg)" stroke="#c084fc" strokeWidth="0.5" />
    {/* Keys row 1 */}
    <rect x="7" y="11.5" width="3" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.8" />
    <rect x="11.5" y="11.5" width="3" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.8" />
    <rect x="16" y="11.5" width="3" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.8" />
    <rect x="20.5" y="11.5" width="4.5" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.6" />
    {/* Keys row 2 */}
    <rect x="7" y="15.5" width="4" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.7" />
    <rect x="12.5" y="15.5" width="7" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.9" />
    <rect x="21" y="15.5" width="4" height="2.5" rx="0.5" fill="url(#kb-key)" opacity="0.7" />
    {/* Keys row 3 - spacebar */}
    <rect x="9" y="19.5" width="14" height="2" rx="0.5" fill="url(#kb-key)" opacity="0.6" />
    {/* Lightning flash indicator */}
    <circle cx="26" cy="11" r="2" fill="#a855f7" opacity="0.8" />
    <path d="M25.5 10 L26.2 11 L25.5 11 L26.5 12" stroke="#fff" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function ShortcutDockButton() {
  const { openConfigurator, shortcutLabel } = useShortcut();

  return (
    <div className="relative group/tooltip">
      <button
        onClick={openConfigurator}
        className="block w-11 h-11 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-[1px] transition-transform active:scale-95 hover:scale-105"
      >
        <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0c] border border-black flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.5)] group-hover/tooltip:border-[#a855f7]/40 transition-all">
          <KeyboardIcon />
        </div>
      </button>

      {/* Glassmorphic Popover Tooltip */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 rounded-xl bg-[#18181b] border border-white/10 text-xs font-bold text-white shadow-xl opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 pointer-events-none transition-all whitespace-nowrap z-50 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
        Shortcut Key
        {shortcutLabel && (
          <span className="ml-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#a855f7]">
            {shortcutLabel}
          </span>
        )}
      </div>
    </div>
  );
}
