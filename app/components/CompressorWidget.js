'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import DiffMap from './DiffMap';

const DEFAULT_PROMPT = `You are an expert full-stack development assistant. Your goal is to help build production-ready applications with comprehensive error handling, logging, and security. Follow established design patterns and best practices. Ensure that all code is modular, well-documented, and robust against potential security vulnerabilities. Pay attention to environment variables, caching strategies, and database design.`;

export default function CompressorWidget() {
  const [text, setText] = useState(DEFAULT_PROMPT);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('compressed');
  const [modelTarget, setModelTarget] = useState('antigravity');

  const textareaRef = useRef(null);

  const handleShrink = async () => {
    if (!text.trim()) return;
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const res = await fetch('/api/compress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, target: modelTarget }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Compression failed');
          return;
        }

        setResult(data);
      } catch (err) {
        setError('Network error. Please try again.');
      }
    });
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleShrink();
    }
  };

  const copyToClipboard = () => {
    if (!result?.compressed) return;
    navigator.clipboard.writeText(result.compressed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (result) {
      const container = document.querySelector('.aurora-hover');
      if (container) {
        const onMouseMove = (e) => {
          const rect = container.getBoundingClientRect();
          container.style.setProperty('--mx', `${e.clientX - rect.left}px`);
          container.style.setProperty('--my', `${e.clientY - rect.top}px`);
        };
        container.addEventListener('mousemove', onMouseMove);
        return () => container.removeEventListener('mousemove', onMouseMove);
      }
    }
  }, [result]);

  return (
    <div className="w-full relative">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">Prompt Studio</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium bg-black/40 p-1 rounded-lg border border-white/10">
          {['gpt-4o', 'claude-3', 'llama-3', 'antigravity'].map(m => (
            <button
              key={m}
              onClick={() => { setModelTarget(m); setResult(null); }}
              className={`px-3 py-1.5 rounded-md transition-all ${modelTarget === m ? 'bg-[#a855f7]/20 text-[#a855f7] font-bold border border-[#a855f7]/30 shadow-sm' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              {m === 'antigravity' ? '⚡ ANTIGRAVITY' : m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Input Textarea */}
        <div className="relative group">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => { setText(e.target.value); setResult(null); }}
            onKeyDown={handleKeyDown}
            placeholder="Paste your verbose AI prompt here..."
            className="w-full min-h-[160px] p-5 bg-white/5 border border-white/10 rounded-2xl text-white font-mono text-sm leading-relaxed focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 focus:outline-none transition-all resize-y shadow-inner placeholder:text-white/20"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3 pointer-events-none">
            <span className="text-xs font-semibold px-3 py-1 bg-black/60 border border-white/10 rounded-lg text-white/50 backdrop-blur-sm">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <span className="text-xs font-semibold px-3 py-1 bg-black/60 border border-white/10 rounded-lg text-white/50 backdrop-blur-sm hidden sm:inline-block">
              ⌘+Enter to shrink
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShrink}
              disabled={isPending || !text.trim()}
              className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-black font-bold text-sm rounded-xl hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none transition-all group/btn flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>{isPending ? 'Compiling Codec...' : 'Shrink Prompt ⚡'}</span>
            </button>
            <button
              onClick={() => { setText(''); setResult(null); }}
              className="px-4 py-3 bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-medium text-sm rounded-xl transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-center gap-3 animate-fade-in">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Compression Result Dashboard */}
        {result && (
          <div className="animate-slide-up space-y-8 mt-12">
            {result.stats.tooShort || result.stats.belowThreshold ? (
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm text-center">
                {result.stats.tooShort
                  ? 'Prompt is already concise (<30 words). Prompty skips compression to ensure zero latency overhead.'
                  : 'Compression would increase text size. We returned your original text unmodified.'}
              </div>
            ) : (
              <>
                {/* Visual Context Bar */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">Context Window Capacity</span>
                    <span className="text-xs font-bold text-[#a855f7]">{result.stats.ratio}x Compression Ratio</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>Original: {result.stats.originalTokens} tokens</span>
                      <span>Compressed: {result.stats.totalCompressedTokens} tokens</span>
                    </div>
                    <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-white/20 transition-all duration-1000 ease-out"
                        style={{ width: `${(result.stats.totalCompressedTokens/result.stats.originalTokens)*100}%` }}
                      />
                      <div 
                        className="h-full bg-gradient-to-r from-[#a855f7] to-[#c084fc] transition-all duration-1000 ease-out delay-500 relative"
                        style={{ width: `${(result.stats.tokensSaved/result.stats.originalTokens)*100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Code Output */}
                  <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col shadow-xl">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab('compressed')}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${activeTab === 'compressed' ? 'bg-[#a855f7]/20 text-[#a855f7]' : 'text-white/50 hover:text-white'}`}
                        >
                          Payload Output
                        </button>
                        <button
                          onClick={() => setActiveTab('diff')}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${activeTab === 'diff' ? 'bg-[#a855f7]/20 text-[#a855f7]' : 'text-white/50 hover:text-white'}`}
                        >
                          Diff Map
                        </button>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="px-3 py-1.5 bg-[#a855f7]/10 hover:bg-[#a855f7]/20 border border-[#a855f7]/30 text-[#a855f7] font-bold rounded-lg text-xs transition-all flex items-center gap-2"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="p-5 flex-1 overflow-y-auto max-h-[320px] font-mono text-xs leading-relaxed text-white/90">
                      {activeTab === 'compressed' ? (
                        <pre className="whitespace-pre-wrap word-break">{result.compressed}</pre>
                      ) : (
                        <DiffMap original={text} compressedBody={result.compressedBody || result.compressed} />
                      )}
                    </div>
                  </div>

                  {/* Right Column: Telemetry Stats */}
                  <div className="rounded-2xl border border-[#a855f7]/30 bg-[#a855f7]/5 overflow-hidden flex flex-col shadow-[0_0_30px_rgba(168,85,247,0.05)] relative group">
                    <div className="px-6 py-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#a855f7]">Codec Telemetry</span>
                      <span className="text-xs font-mono text-white/50">{result.stats.tokenizerUsed}</span>
                    </div>

                    <div className="p-6 grid grid-cols-2 gap-6 flex-1">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">Tokens Saved</p>
                        <p className="text-3xl font-black text-[#a855f7] tracking-tight">{result.stats.tokensSaved}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">Cost Reduction</p>
                        <p className="text-3xl font-black text-white tracking-tight">${result.stats.dollarsSaved}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">Rosetta Entries</p>
                        <p className="text-xl font-bold text-white/80">{result.stats.replacementCount || 0}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mb-1">Strategy</p>
                        <p className="text-xl font-bold text-white/80 capitalize">{result.stats.strategy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
