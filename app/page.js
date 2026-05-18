import LandingStudioDashboard from './components/LandingStudioDashboard';
import LogoBar from './components/LogoBar';
import AuroraCard from './components/AuroraCard';
import Link from 'next/link';
import FadeIn from '@/components/fade-in';
import SplitText from '@/components/split-text';
import MagneticButton from '@/components/magnetic-button';
import TiltWrapper from '@/components/tilt-wrapper';

export default function Home() {
  return (
    <div className="bg-[#080808] text-[#f0f0f0] overflow-x-hidden selection:bg-[#a855f7]/30">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="px-8 pt-16 pb-24 relative flex flex-col items-center justify-center min-h-[85vh]">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#a855f7]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#a855f7]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

          {/* Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#c0c0c0] mb-8 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
                TokenShrink v2.1 — built by Abhinav Dwivedi
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.1] mb-6">
                <SplitText text="Cut token costs." as="span" stagger={25} delay={200} />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#c084fc]">
                  <SplitText text="Keep the context." as="span" stagger={30} delay={600} />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={400}>
              <p className="mt-6 text-xl text-[#888888] max-w-2xl mx-auto font-medium leading-relaxed">
                A seamless middleware that compresses your LLM prompts. Slash your API bills by up to 35% without degrading model performance.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton as="div">
                  <Link href="/login" className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    Start Compressing
                  </Link>
                </MagneticButton>
                <MagneticButton as="div">
                  <a href="#demo" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md">
                    Try the Demo
                  </a>
                </MagneticButton>
              </div>
              <p className="mt-8 text-xs font-mono text-[#666666] tracking-wide flex items-center justify-center gap-4">
                <span>npm i prompty</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Works with OpenAI, Anthropic & Gemini</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Demo & Integrated Dashboard Section */}
        <section id="demo" className="px-8 py-24 relative z-20 -mt-20">
          <FadeIn delay={600}>
            <LandingStudioDashboard />
          </FadeIn>
        </section>

        {/* Logo Bar */}
        <FadeIn delay={200}>
          <div className="py-10 border-y border-white/5 bg-white/[0.02]">
            <LogoBar />
          </div>
        </FadeIn>

        {/* Features Grid */}
        <section className="px-8 py-32 relative">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[160px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for scale.</h2>
                <p className="text-xl text-[#888888] max-w-2xl mx-auto">
                  A high-performance text compression engine that processes prompts in under 20ms. Completely transparent to your users.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Zero Latency',
                  desc: 'Runs entirely on your server or at the edge. No external API calls required for the core compression engine.',
                  icon: '⚡',
                },
                {
                  title: 'Universal Compatibility',
                  desc: 'Outputs standard text. If your LLM accepts strings, it works. First-class support for all major providers.',
                  icon: '🌐',
                },
                {
                  title: 'Cryptographic Privacy',
                  desc: 'Your prompts never leave your infrastructure. Prompty can be deployed in a Trusted Execution Environment (TEE).',
                  icon: '🔒',
                },
              ].map(({ title, desc, icon }, i) => (
                <FadeIn key={title} delay={i * 150}>
                  <TiltWrapper>
                    <AuroraCard className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-all h-full group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                        {icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
                      <p className="text-[#a0a0a0] leading-relaxed">{desc}</p>
                    </AuroraCard>
                  </TiltWrapper>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Experience Snippet */}
        <section className="px-8 py-32 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-xs font-bold text-[#a855f7] mb-6">
                  Developer First
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">Integrate in minutes,<br/>save forever.</h2>
                <p className="text-lg text-[#888888] mb-8 leading-relaxed">
                  Our drop-in SDK automatically intercepts and compresses outgoing prompts before they hit the LLM provider. Two lines of code is all it takes.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Typed for TypeScript', 'Next.js App Router ready', 'Edge compatible'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-[#a0a0a0]">
                      <span className="w-5 h-5 rounded-full bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] text-xs font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/docs" className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#a855f7] transition-colors">
                  Read the documentation <span aria-hidden="true">→</span>
                </Link>
              </FadeIn>
            </div>
            
            <FadeIn delay={200}>
              <TiltWrapper>
                <div className="rounded-3xl bg-black border border-white/10 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-4 text-xs font-mono text-[#888888]">middleware.ts</span>
                  </div>
                  <pre className="p-6 text-sm font-mono text-[#a0a0a0] overflow-x-auto leading-relaxed">
                    <code><span className="text-[#c678dd]">import</span> {'{ compress }'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'prompty'</span>;
<span className="text-[#c678dd]">import</span> OpenAI <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'openai'</span>;

<span className="text-[#5c6370]">{'// 1. Wrap your prompt'}</span>
<span className="text-[#c678dd]">const</span> {'{ compressed }'} = compress(systemPrompt);

<span className="text-[#5c6370]">{'// 2. Call the LLM normally'}</span>
<span className="text-[#c678dd]">const</span> openai = <span className="text-[#c678dd]">new</span> OpenAI();
<span className="text-[#c678dd]">const</span> res = <span className="text-[#c678dd]">await</span> openai.chat.completions.create({'{'}
  <span className="text-[#e06c75]">model</span>: <span className="text-[#98c379]">'gpt-4-turbo'</span>,
  <span className="text-[#e06c75]">messages</span>: [{'{'} <span className="text-[#e06c75]">role</span>: <span className="text-[#98c379]">'system'</span>, <span className="text-[#e06c75]">content</span>: compressed {'}'}],
{'}'});</code>
                  </pre>
                </div>
              </TiltWrapper>
            </FadeIn>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#a855f7]/20 blur-[140px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8">
                Ready to shrink <br/>your AWS bill?
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-xl text-[#888888] mb-12 max-w-2xl mx-auto">
                I built this because LLM token costs were killing my side projects. Now it's open source and free for everyone. Give it a try.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <MagneticButton as="div" className="inline-block">
                <Link
                  href="/login"
                  className="inline-block px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] text-lg"
                >
                  Start optimizing for free
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 border-t border-white/10 bg-black">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[#a855f7] text-xl leading-none font-black">◈</span>
              <span className="text-lg font-bold tracking-tight text-white">TokenShrink</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-[#888888]">
              <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="/providers" className="hover:text-white transition-colors">AI Providers</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <a href="https://github.com/learnerabhinavdwivedi-droid/prompty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
            
            <p className="text-[#666666] text-sm font-medium">
              Built by{' '}
              <a
                href="https://github.com/learnerabhinavdwivedi-droid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a855f7] hover:text-[#c084fc] transition-colors font-semibold"
              >
                Abhinav Dwivedi
              </a>
              {' '}· MIT License
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
