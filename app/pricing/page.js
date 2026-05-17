import Link from 'next/link';
import UpgradeButton from './UpgradeButton';
import SavingsCalculator from './SavingsCalculator';

export const metadata = {
  title: 'Pricing Plans — TokenShrink',
  description: 'TokenShrink Free is free forever. TokenShrink Advanced unlocks the Rosetta Protocol — negotiated session cipher, domain rotors, and cross-session learning.',
};

const CHECK = (
  <svg className="w-5 h-5 text-[#a855f7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const DASH = (
  <svg className="w-5 h-5 text-[#333333] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const FREE_FEATURES = [
  { label: 'Web compressor studio', included: true },
  { label: 'Unlimited prompt compressions', included: true },
  { label: 'API access + TypeScript SDK', included: true },
  { label: 'Universal LLM provider support', included: true },
  { label: 'Telemetry dashboard', included: true },
  { label: 'No sign-up required to try', included: true },
  { label: 'Rosetta Protocol (Enigma codec)', included: false },
  { label: 'Domain rotors (React / Node / Python)', included: false },
  { label: 'Cross-session agent learning', included: false },
];

const ADVANCED_FEATURES = [
  { label: 'Everything in Community Plan', included: true },
  { label: 'Rosetta Protocol — custom session cipher', included: true },
  { label: 'Session codebook applied to every message', included: true },
  { label: 'Domain rotors — auto-loads vocab packs', included: true },
  { label: 'Sub-agent vocab inheritance', included: true },
  { label: 'Cross-session learning (Hall of Fame)', included: true },
  { label: 'Compaction-safe reinjection', included: true },
  { label: 'Advanced ROI telemetry dashboard', included: true },
];

export default function PricingPage() {
  return (
    <div className="bg-[#080808] flex-1 text-[#f0f0f0] overflow-x-hidden selection:bg-[#a855f7]/30">
      <main className="pt-16 pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[160px] pointer-events-none" />

        <section className="px-8 relative z-10 pt-12">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">Simple, transparent pricing.</h1>
            <p className="text-xl text-[#888888] font-medium leading-relaxed">
              Start compressing your prompts for free. Upgrade to Advanced to unlock the Enigma Machine and cross-session learning.
            </p>
          </div>

          <div className="mb-24">
            <SavingsCalculator />
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            {/* Community Plan */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 flex flex-col hover:bg-white/[0.07] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#c0c0c0] mb-6 uppercase tracking-wider">
                  Community
                </div>
                <h3 className="text-2xl font-bold text-white">TokenShrink Free</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-6xl font-black text-white">$0</span>
                  <span className="text-lg text-[#888888] font-medium">/ forever</span>
                </div>
                <p className="text-sm text-[#888888] mt-4 font-semibold">No credit card required. Never expires.</p>
              </div>

              <div className="my-8 h-px w-full bg-white/10" />

              <ul className="space-y-4 flex-1">
                {FREE_FEATURES.map(({ label, included }) => (
                  <li key={label} className="flex items-start gap-3 text-sm font-semibold">
                    {included ? CHECK : DASH}
                    <span className={included ? 'text-[#e0e0e0]' : 'text-[#666666]'}>{label}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className="mt-10 block w-full py-4 rounded-xl text-sm font-bold text-center border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-sm"
              >
                Get started for free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="rounded-3xl border border-[#a855f7]/40 bg-gradient-to-b from-[#a855f7]/15 to-transparent backdrop-blur-xl p-10 flex flex-col relative group shadow-[0_0_40px_rgba(168,85,247,0.1)]">
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[#a855f7]/30 group-hover:ring-[#a855f7]/60 transition-all pointer-events-none" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-black text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  The Enigma Machine
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/30 text-xs font-black text-[#a855f7] mb-6 uppercase tracking-wider">
                  Pro
                </div>
                <h3 className="text-2xl font-bold text-white">TokenShrink Advanced</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-6xl font-black text-white">$5</span>
                  <span className="text-lg text-[#888888] font-medium">/ month</span>
                </div>
                <p className="text-sm font-bold text-[#a855f7] mt-4">
                  $36/year — save 40% <span className="font-semibold text-[#a855f7]/70">($3/mo)</span>
                </p>
              </div>

              <div className="my-8 h-px w-full bg-[#a855f7]/30" />

              <ul className="space-y-4 flex-1">
                {ADVANCED_FEATURES.map(({ label }) => (
                  <li key={label} className="flex items-start gap-3 text-sm font-semibold text-white">
                    {CHECK}
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <UpgradeButton />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-8 py-32 relative z-10 mt-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-16 tracking-tight">
              Frequently asked questions
            </h2>
            <div className="grid gap-6">
              {[
                {
                  q: 'Is Free really free forever?',
                  a: 'Yes. Phrase compression, API access, and the usage dashboard stay free with no credit card and no expiry. We mean it.',
                },
                {
                  q: 'What does Advanced add on top of Free?',
                  a: 'The Rosetta Protocol — a negotiated session cipher. At session start, a codebook is built from your project vocabulary. Every message is then compressed using that cipher. Advanced also includes domain rotors and cross-session learning.',
                },
                {
                  q: 'Does compression affect AI response quality?',
                  a: 'No. We prepend a tiny decoder header that teaches the LLM our abbreviations. The AI understands the compressed prompt perfectly. For prompts under 30 words, we skip compression entirely to ensure 100% accuracy.',
                },
                {
                  q: 'Do you store my prompts?',
                  a: 'Never. We only store word counts, compression ratios, and usage statistics. Your prompts are processed in-memory and immediately discarded. Deploy in a TEE for cryptographic proof.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all">
                  <h3 className="text-lg font-bold text-white mb-3">{q}</h3>
                  <p className="text-[#a0a0a0] leading-relaxed font-medium">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
