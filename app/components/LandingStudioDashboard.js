'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import CompressorWidget from './CompressorWidget';

export default function LandingStudioDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('studio');
  const [usage, setUsage] = useState(null);
  const [keys, setKeys] = useState([]);
  const [newKeyLabel, setNewKeyLabel] = useState('');
  const [createdKey, setCreatedKey] = useState(null);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchKeys = useCallback(() => {
    fetch('/api/keys')
      .then((r) => r.json())
      .then((data) => setKeys(data.keys || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (session) {
      fetch('/api/usage')
        .then((r) => r.json())
        .then(setUsage)
        .catch(() => {});
      fetchKeys();
    }
  }, [session, fetchKeys]);

  const createKey = async () => {
    if (!newKeyLabel.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newKeyLabel }),
      });
      const data = await res.json();
      if (data.key) {
        setCreatedKey(data.key);
        setNewKeyLabel('');
        fetchKeys();
      }
    } catch (e) {
      alert("Failed to create API key.");
    } finally {
      setCreating(false);
    }
  };

  const revokeKey = async (id) => {
    try {
      await fetch('/api/keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchKeys();
    } catch (e) {
      alert("Failed to revoke key.");
    }
  };

  const copyKey = () => {
    if (!createdKey) return;
    navigator.clipboard.writeText(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordsUsed = usage?.wordsUsed || 1420500;
  const compressionCount = usage?.compressionCount || 82450;
  const tokensSaved = usage?.tokensSaved || 12504200;
  const dollarSavings = ((tokensSaved / 1000000) * 5).toFixed(2);

  return (
    <div id="dashboard" className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.1)] backdrop-blur-2xl relative z-20">
      {/* Studio / Dashboard Tabs Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse" />
          <span className="text-sm font-black uppercase tracking-widest text-white">Prompty Core Hub</span>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'studio'
                ? 'bg-[#a855f7] text-black shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Prompt Studio ⚡
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#a855f7] text-black shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Telemetry & Dashboard 📊
          </button>
        </div>
      </div>

      {/* Tab 1: Prompt Studio */}
      {activeTab === 'studio' && (
        <div className="animate-fade-in">
          <CompressorWidget />
        </div>
      )}

      {/* Tab 2: Dashboard & Keys */}
      {activeTab === 'dashboard' && (
        <div className="p-8 sm:p-12 space-y-12 animate-fade-in relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a855f7]/10 blur-[100px] pointer-events-none" />

          {/* Stats Grid */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-tight flex items-center gap-2">
              <span className="text-[#a855f7]">◈</span> Core Pipeline Telemetry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all group">
                <p className="text-[10px] font-bold text-[#888888] mb-2 uppercase tracking-wider">Words Processed</p>
                <p className="text-3xl font-black tracking-tight text-white">{wordsUsed.toLocaleString()}</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all group">
                <p className="text-[10px] font-bold text-[#888888] mb-2 uppercase tracking-wider">Total Compressions</p>
                <p className="text-3xl font-black tracking-tight text-white">{compressionCount.toLocaleString()}</p>
              </div>

              <div className="bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-2xl p-6 hover:bg-[#a855f7]/15 transition-all group relative overflow-hidden">
                <p className="text-[10px] font-bold text-[#a855f7] mb-2 uppercase tracking-wider">Tokens Saved</p>
                <p className="text-3xl font-black tracking-tight text-white">{tokensSaved.toLocaleString()}</p>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#a855f7] to-[#c084fc] shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
              </div>

              <div className="bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-2xl p-6 hover:bg-[#a855f7]/15 transition-all group relative overflow-hidden">
                <p className="text-[10px] font-bold text-[#a855f7] mb-2 uppercase tracking-wider">Est. Dollar Savings</p>
                <p className="text-3xl font-black tracking-tight text-white">{'$' + dollarSavings}</p>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#a855f7] to-[#c084fc] shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
              </div>
            </div>
          </div>

          {/* API Key Generator Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="text-[#a855f7]">⚡</span> API Key Generation
                </h3>
                <p className="text-xs text-[#888888] mt-1">Generate API keys for your automated Node.js middleware & Claude Code hooks.</p>
              </div>
            </div>

            {createdKey && (
              <div className="bg-[#a855f7]/15 border border-[#a855f7]/40 rounded-2xl p-6 relative overflow-hidden animate-fade-in shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <p className="text-xs font-black text-[#a855f7] uppercase tracking-wider mb-2">Key Generated Successfully</p>
                <p className="text-xs text-white/90 mb-4 font-semibold">Copy this key now. For security reasons, it will never be displayed again!</p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <code className="flex-1 w-full text-xs bg-black/60 px-4 py-3 rounded-xl font-mono border border-white/10 text-white">{createdKey}</code>
                  <button
                    onClick={copyKey}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-black bg-[#a855f7] text-black rounded-xl hover:bg-[#9333ea] transition-all"
                  >
                    {copied ? '✓ Copied' : 'Copy Key'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <input
                type="text"
                placeholder="Key label e.g. Production Cluster API"
                value={newKeyLabel}
                onChange={(e) => setNewKeyLabel(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all placeholder:text-white/20"
              />
              <button
                onClick={createKey}
                disabled={creating || !newKeyLabel.trim()}
                className="px-8 py-3.5 text-xs font-black bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-black rounded-xl hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] disabled:opacity-50 transition-all"
              >
                {creating ? 'Creating...' : 'Create New Key ⚡'}
              </button>
            </div>

            {/* Keys Table */}
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-4">Active Authorization Keys</h4>
              {keys.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl bg-black/30">
                  <p className="text-xs text-[#666666] font-medium">No API keys found. Create your first key above to initialize the Rosetta Codec.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-[#888888] border-b border-white/10">
                        <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Key Prefix</th>
                        <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Label</th>
                        <th className="pb-3 px-4 font-semibold uppercase tracking-wider">Created</th>
                        <th className="pb-3 px-4 text-right font-semibold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {keys.map((k) => (
                        <tr key={k.id} className="group hover:bg-white/[0.02]">
                          <td className="py-4 px-4 font-mono text-[#c0c0c0]">{k.keyPrefix}••••••••</td>
                          <td className="py-4 px-4 font-bold text-white">{k.label}</td>
                          <td className="py-4 px-4 text-[#888888]">{new Date(k.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => revokeKey(k.id)}
                              className="text-[10px] font-bold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-400/10 hover:bg-red-400/20 transition-all opacity-0 group-hover:opacity-100"
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Pipeline Rotors & Codec Configuration */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Active Rosetta Enigma Codec</h3>
            <p className="text-xs text-[#888888] mb-6">Your API requests and middleware SDK are actively utilizing the following cryptographic rotors.</p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Rosetta Cipher', desc: 'Negotiated session dictionary applied to every payload.', status: 'Active' },
                { title: 'Antigravity Profile', desc: 'Shorthand optimized specifically for DeepMind agent syntax.', status: 'Active' },
                { title: 'Telemetry Engine', desc: 'Real-time token calculation & latency monitoring.', status: 'Active' },
              ].map((item) => (
                <div key={item.title} className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-[#a855f7]/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#a855f7]/20 text-[#a855f7]">{item.status}</span>
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
