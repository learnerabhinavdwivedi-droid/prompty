export const metadata = {
  title: 'API Documentation — Prompty',
  description: 'Prompty API and SDK documentation. Compress your AI prompts programmatically.',
};

export default function DocsPage() {
  return (
    <main className="pt-16 pb-24 px-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#a855f7]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto py-12 relative z-10 space-y-16">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#a855f7] mb-3">
            ◈ REST API & NPM SDK
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">API Documentation</h1>
          <p className="text-base text-[#888888] max-w-2xl mx-auto font-medium leading-relaxed">
            Compress prompts programmatically via our high-speed REST API or local npm SDK.
          </p>
        </div>

        {/* Quick start */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-[#a855f7]">◈</span> Quick Start
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <h3 className="text-sm font-bold text-[#a855f7] mb-2">1. Get your API key</h3>
              <p className="text-xs text-[#c0c0c0] leading-relaxed">
                Sign up for free, then generate an API key from your{' '}
                <a href="/dashboard" className="text-[#a855f7] font-bold hover:underline">dashboard</a>.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl md:col-span-2">
              <h3 className="text-sm font-bold text-[#a855f7] mb-3">2. Compress via API</h3>
              <pre className="text-xs font-mono text-[#c0c0c0] bg-black/60 p-4 rounded-xl overflow-x-auto border border-white/10">
{`curl -X POST https://promptyy-eta.vercel.app/api/compress \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ts_live_your_key_here" \\
  -d '{
    "text": "Your long prompt text here...",
    "domain": "auto"
  }'`}
              </pre>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-sm font-bold text-[#a855f7] mb-3">3. Or use the SDK (v2.0)</h3>
            <pre className="text-xs font-mono text-[#a855f7] bg-[#a855f7]/10 p-4 rounded-xl border border-[#a855f7]/20 font-bold mb-4">
{`npm install prompty`}
            </pre>
            <pre className="text-xs font-mono text-[#c0c0c0] bg-black/60 p-5 rounded-xl overflow-x-auto border border-white/10 leading-relaxed">
{`import { compress } from 'prompty';

// Compress a prompt — runs locally, no API call needed
const result = compress('Your long prompt...');
console.log(result.compressed);
console.log(result.stats.tokensSaved);       // Real token savings
console.log(result.stats.originalTokens);     // Original token count
console.log(result.stats.totalCompressedTokens); // Compressed token count

// Optional: plug in a real tokenizer for exact counts
import { encode } from 'gpt-tokenizer';
const result2 = compress('Your long prompt...', {
  tokenizer: (text) => encode(text).length
});

// Use with any LLM provider
import OpenAI from 'openai';
const openai = new OpenAI();
const res = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'system', content: result.compressed }],
});`}
            </pre>
          </div>
        </section>

        {/* API Reference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-[#a855f7]">◈</span> API Reference
          </h2>

          <div className="space-y-6">
            {/* POST /api/compress */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
                <span className="text-xs font-mono font-black text-black bg-[#a855f7] px-3 py-1 rounded-md shadow-[0_0_15px_rgba(168,85,247,0.4)]">POST</span>
                <span className="text-sm font-mono font-bold text-white">/api/compress</span>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">Headers</h4>
                  <div className="text-xs font-mono text-[#c0c0c0] space-y-1 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div><span className="text-white font-bold">Content-Type:</span> application/json</div>
                    <div><span className="text-white font-bold">x-api-key:</span> ts_live_... <span className="text-[#888888]">(optional for anonymous, required for API usage)</span></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">Request Body</h4>
                  <pre className="text-xs font-mono text-[#c0c0c0] bg-black/40 p-4 rounded-xl border border-white/5">
{`{
  "text": "string (required) — the text to compress",
  "domain": "string (optional) — auto|code|medical|legal|business"
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">Response</h4>
                  <pre className="text-xs font-mono text-[#c0c0c0] bg-black/40 p-4 rounded-xl border border-white/5 leading-relaxed">
{`{
  "compressed": "string — full compressed text with Rosetta header",
  "rosetta": "string — just the decoder header",
  "stats": {
    "originalWords": 150,
    "compressedWords": 42,
    "rosettaWords": 18,
    "totalCompressedWords": 60,
    "originalTokens": 168,
    "compressedTokens": 45,
    "rosettaTokens": 22,
    "totalCompressedTokens": 67,
    "ratio": 2.5,
    "tokensSaved": 101,
    "dollarsSaved": 0.05,
    "strategy": "domain",
    "domain": "code",
    "tokenizerUsed": "built-in"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* GET /api/usage */}
            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
                <span className="text-xs font-mono font-black text-black bg-blue-400 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(96,165,250,0.4)]">GET</span>
                <span className="text-sm font-mono font-bold text-white">/api/usage</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#c0c0c0] leading-relaxed">
                  Returns your current usage stats, monthly history, and recent compressions. Requires authentication (session or API key).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rate limits */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-[#a855f7]">◈</span> Rate Limits
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <div className="space-y-4 text-sm text-[#c0c0c0]">
              <div className="flex justify-between py-2 border-b border-white/5 font-semibold">
                <span>Requests per minute</span>
                <span className="text-white font-bold">10</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5 font-semibold">
                <span>Words per request</span>
                <span className="text-white font-bold">100,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5 font-semibold">
                <span>Monthly limit</span>
                <span className="text-white font-bold">500 calls/month on Free, unlimited on Advanced</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Price</span>
                <span className="text-[#a855f7] font-bold">Free</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenizer */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-[#a855f7]">◈</span> Token Counting
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-4">
            <p className="text-sm text-[#c0c0c0] leading-relaxed font-medium">
              v2.0 uses real token counts instead of word estimates. By default, Prompty uses a precomputed lookup table based on <code className="text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded-md text-xs font-mono border border-[#a855f7]/20">cl100k_base</code> (GPT-4). For exact counts with your specific model, pass a custom tokenizer:
            </p>
            <pre className="text-xs font-mono text-[#c0c0c0] bg-black/60 p-5 rounded-xl overflow-x-auto border border-white/10 leading-relaxed font-bold">
{`import { compress } from 'prompty';
import { encode } from 'gpt-tokenizer';

const result = compress(text, {
  tokenizer: (text) => encode(text).length
});`}
            </pre>
          </div>
        </section>

        {/* Domains */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-[#a855f7]">◈</span> Compression Domains
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl space-y-6">
            <p className="text-sm text-[#c0c0c0] leading-relaxed font-medium">
              Set <code className="text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded-md text-xs font-mono border border-[#a855f7]/20">domain</code> to optimize compression for specific content types. Default is <code className="text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded-md text-xs font-mono border border-[#a855f7]/20">auto</code>.
            </p>
            <div className="space-y-4 text-sm font-semibold">
              {[
                { domain: 'auto', desc: 'Automatically detects the best strategy' },
                { domain: 'code', desc: 'Programming and technical documentation' },
                { domain: 'medical', desc: 'Medical records, clinical notes' },
                { domain: 'legal', desc: 'Contracts, legal documents' },
                { domain: 'business', desc: 'Business communications, reports' },
              ].map(({ domain, desc }) => (
                <div key={domain} className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                  <code className="text-xs font-mono text-black font-black bg-[#a855f7] px-3 py-1 rounded-md shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0 uppercase tracking-wider">
                    {domain}
                  </code>
                  <span className="text-[#e0e0e0]">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
