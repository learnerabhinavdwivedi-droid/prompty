'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ShortcutToast({ message, stats, visible, onDismiss }) {
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setExiting(false);
      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setShow(false);
          setExiting(false);
          onDismiss?.();
        }, 400);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 z-[9999] max-w-sm transition-all duration-400 ${
        exiting
          ? 'opacity-0 translate-y-4 scale-95'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
      style={{ animation: exiting ? 'none' : 'toast-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0c0c0c]/95 border border-white/10 shadow-[0_20px_60px_rgba(168,85,247,0.3),0_0_0_1px_rgba(168,85,247,0.1)] backdrop-blur-2xl">
        {/* Glow bar */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />

        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Pulse icon */}
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <span className="text-lg">✨</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white tracking-tight">
                {message || 'Prompt Optimized!'}
              </p>

              {stats && (
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="text-[#888888]">
                    {stats.originalTokens} → {stats.totalCompressedTokens} tokens
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#a855f7]/20 text-[#c084fc] font-bold">
                    {stats.tokensSaved} saved ({Math.round((1 - stats.totalCompressedTokens / stats.originalTokens) * 100)}%)
                  </span>
                </div>
              )}

              {stats && stats.dollarsSaved > 0 && (
                <p className="mt-1.5 text-[10px] text-[#666666] font-medium">
                  Est. ${stats.dollarsSaved.toFixed(4)} saved on this call
                </p>
              )}
            </div>

            {/* Dismiss */}
            <button
              onClick={() => {
                setExiting(true);
                setTimeout(() => {
                  setShow(false);
                  onDismiss?.();
                }, 300);
              }}
              className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[#666666] hover:text-white hover:bg-white/10 transition-all text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Timer progress bar */}
        <div className="h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#a855f7] to-[#c084fc]"
            style={{
              animation: 'toast-timer 3.5s linear forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
}
