import Link from 'next/link';

export const metadata = {
  title: 'AI Provider Directory — TokenShrink',
  description: 'Compare AI API providers, pricing, and models. TokenShrink works with every LLM provider — compress your prompts and save on all of them.',
};

const providers = [
  {
    name: 'OpenAI',
    tagline: 'The pioneer in large language models',
    models: [
      { name: 'GPT-4o', input: '$2.50', output: '$10.00' },
      { name: 'GPT-4o mini', input: '$0.15', output: '$0.60' },
      { name: 'o1', input: '$15.00', output: '$60.00' },
      { name: 'o3-mini', input: '$1.10', output: '$4.40' },
    ],
    free: 'Free tier with usage limits for new accounts',
    link: 'https://openai.com/api/pricing/',
    color: 'text-purple-400',
    borderColor: 'border-purple-400/20',
    bgColor: 'bg-purple-400/5',
  },
  {
    name: 'Anthropic',
    tagline: 'Safety-focused AI with Claude models',
    models: [
      { name: 'Claude Opus 4', input: '$15.00', output: '$75.00' },
      { name: 'Claude Sonnet 4', input: '$3.00', output: '$15.00' },
      { name: 'Claude Haiku 3.5', input: '$0.80', output: '$4.00' },
    ],
    free: 'Free tier via claude.ai (limited usage)',
    link: 'https://www.anthropic.com/pricing',
    color: 'text-[#a855f7]',
    borderColor: 'border-[#a855f7]/20',
    bgColor: 'bg-[#a855f7]/5',
  },
  {
    name: 'Google / DeepMind',
    tagline: 'Gemini models with massive context windows & agentic features',
    models: [
      { name: 'Gemini 2.5 Flash', input: '$0.15', output: '$0.60' },
      { name: 'Gemini 2.5 Pro', input: '$1.25', output: '$10.00' },
      { name: 'Antigravity / DeepMind v2', input: '$0.10', output: '$0.40' },
    ],
    free: 'Generous free tier via Google AI Studio',
    link: 'https://ai.google.dev/pricing',
    color: 'text-violet-400',
    borderColor: 'border-violet-400/20',
    bgColor: 'bg-violet-400/5',
  },
  {
    name: 'Mistral',
    tagline: 'European AI with efficient open-weight models',
    models: [
      { name: 'Mistral Large', input: '$2.00', output: '$6.00' },
      { name: 'Mistral Small', input: '$0.10', output: '$0.30' },
      { name: 'Codestral', input: '$0.30', output: '$0.90' },
    ],
    free: 'Free tier for experimentation',
    link: 'https://mistral.ai/products/pricing/',
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-400/20',
    bgColor: 'bg-fuchsia-400/5',
  },
  {
    name: 'Meta / Llama',
    tagline: 'Open-source models available via multiple hosts',
    models: [
      { name: 'Llama 3.3 70B', input: '$0.60', output: '$0.60' },
      { name: 'Llama 3.2 8B', input: '$0.05', output: '$0.05' },
      { name: 'Llama 4 Scout', input: '$0.17', output: '$0.17' },
    ],
    free: 'Open weights — self-host for free, or use hosted providers',
    link: 'https://llama.meta.com/',
    color: 'text-pink-400',
    borderColor: 'border-pink-400/20',
    bgColor: 'bg-pink-400/5',
  },
  {
    name: 'Cohere',
    tagline: 'Enterprise-focused AI with RAG specialization',
    models: [
      { name: 'Command R+', input: '$2.50', output: '$10.00' },
      { name: 'Command R', input: '$0.15', output: '$0.60' },
    ],
    free: 'Free trial tier for developers',
    link: 'https://cohere.com/pricing',
    color: 'text-rose-400',
    borderColor: 'border-rose-400/20',
    bgColor: 'bg-rose-400/5',
  },
  {
    name: 'Groq',
    tagline: 'Ultra-fast inference with custom LPU hardware',
    models: [
      { name: 'Llama 3.3 70B', input: '$0.59', output: '$0.79' },
      { name: 'Mixtral 8x7B', input: '$0.24', output: '$0.24' },
      { name: 'Gemma 2 9B', input: '$0.20', output: '$0.20' },
    ],
    free: 'Free tier with rate limits',
    link: 'https://groq.com/pricing/',
    color: 'text-amber-400',
    borderColor: 'border-amber-400/20',
    bgColor: 'bg-amber-400/5',
  },
  {
    name: 'Cerebras',
    tagline: 'Wafer-scale inference for blazing speed',
    models: [
      { name: 'Llama 3.3 70B', input: '$0.60', output: '$0.60' },
      { name: 'Llama 3.1 8B', input: '$0.10', output: '$0.10' },
    ],
    free: 'Free tier available for developers',
    link: 'https://cerebras.ai/',
    color: 'text-teal-400',
    borderColor: 'border-teal-400/20',
    bgColor: 'bg-teal-400/5',
  },
];

export default function ProvidersPage() {
  return (
    <main className="pt-16 pb-24">
      <section className="max-w-5xl mx-auto px-8 py-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#a855f7]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="text-center mb-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            AI Provider <span className="text-[#a855f7]">Directory</span>
          </h1>
          <p className="mt-4 text-[#888888] max-w-2xl mx-auto font-medium leading-relaxed">
            Compare pricing across major AI API providers. TokenShrink compresses your prompts before you send them — saving you money with every provider listed here.
          </p>
        </div>

        {/* How savings work callout */}
        <div className="mb-12 p-6 rounded-2xl border border-[#a855f7]/30 bg-[#a855f7]/10 text-center backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.05)] relative z-10">
          <p className="text-sm text-white/90">
            <strong className="text-[#a855f7]">How it works:</strong> Compress your prompt with TokenShrink, then paste the compressed version into your provider of choice. Fewer tokens in = lower cost. It works with every provider below.
          </p>
        </div>

        {/* Provider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className={`rounded-2xl border ${provider.borderColor} ${provider.bgColor} overflow-hidden backdrop-blur-sm shadow-lg hover:scale-[1.01] transition-transform`}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 bg-black/20">
                <div className="flex items-center justify-between">
                  <h2 className={`text-lg font-bold ${provider.color}`}>
                    {provider.name}
                  </h2>
                  <span className="text-[10px] uppercase tracking-wider text-[#a855f7] bg-[#a855f7]/10 px-2.5 py-1 rounded-full font-bold border border-[#a855f7]/20">
                    Works with TokenShrink
                  </span>
                </div>
                <p className="text-xs text-[#888888] mt-1.5">{provider.tagline}</p>
              </div>

              {/* Pricing table */}
              <div className="px-6 py-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#888888] border-b border-white/5">
                      <th className="text-left pb-2 font-semibold uppercase tracking-wider">Model</th>
                      <th className="text-right pb-2 font-semibold uppercase tracking-wider">Input / 1M</th>
                      <th className="text-right pb-2 font-semibold uppercase tracking-wider">Output / 1M</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {provider.models.map((model) => (
                      <tr key={model.name} className="group/row">
                        <td className="py-2.5 text-white font-semibold">{model.name}</td>
                        <td className="py-2.5 text-right font-mono text-white/80">{model.input}</td>
                        <td className="py-2.5 text-right font-mono text-white/80">{model.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
                <span className="text-[11px] text-[#888888] font-medium max-w-[200px] truncate">{provider.free}</span>
                <a
                  href={provider.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-bold ${provider.color} hover:underline flex items-center gap-1`}
                >
                  View pricing &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center relative z-10">
          <p className="text-[#888888] mb-6 font-semibold">
            Ready to save on all of them?
          </p>
          <Link
            href="/login"
            className="inline-block px-10 py-4 bg-[#a855f7] text-black font-bold rounded-xl hover:bg-[#9333ea] transition-all text-sm shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-105"
          >
            Try TokenShrink Advanced
          </Link>
        </div>
      </section>
    </main>
  );
}
