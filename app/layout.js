// Prompty SaaS Root Layout - 3D Glassmorphic Floating Dock
import { Space_Mono, Geist_Mono, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';
import SmoothScroll from '@/components/smooth-scroll';
import { Analytics } from '@vercel/analytics/next';
import Link from 'next/link';

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'TokenShrink — Same AI, Fewer Tokens.',
  description: 'Token-aware prompt compression. Save up to 35% on LLM API costs without degrading model performance. Built by Abhinav Dwivedi.',
};

// 3D Faceted Lightning Bolt
const LightningIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(168,85,247,0.6)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="light-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
      <linearGradient id="light-hl" x1="0" y1="0" x2="16" y2="32">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M18 4 L8 18 L16 18 L14 28 L24 14 L16 14 Z" fill="url(#light-grad)" stroke="url(#light-hl)" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

// 3D Bar Chart on Platform
const ChartIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(168,85,247,0.4)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="32"><stop offset="0%" stopColor="#7e22ce"/><stop offset="100%" stopColor="#3b0764"/></linearGradient>
      <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="32"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#4f46e5"/></linearGradient>
      <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="32"><stop offset="0%" stopColor="#d8b4fe"/><stop offset="100%" stopColor="#9333ea"/></linearGradient>
      <linearGradient id="base" x1="0" y1="0" x2="32" y2="0"><stop offset="0%" stopColor="#ffffff"/><stop offset="50%" stopColor="#a1a1aa"/><stop offset="100%" stopColor="#3f3f46"/></linearGradient>
    </defs>
    <rect x="7" y="14" width="4.5" height="10" rx="1" fill="url(#bar1)" stroke="#c084fc" strokeWidth="0.5" />
    <rect x="14" y="17" width="4.5" height="7" rx="1" fill="url(#bar2)" stroke="#a5b4fc" strokeWidth="0.5" />
    <rect x="21" y="10" width="4.5" height="14" rx="1" fill="url(#bar3)" stroke="#f3e8ff" strokeWidth="0.5" />
    <path d="M5 25.5 L27 25.5" stroke="url(#base)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Glowing Purple Globe
const GlobeIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <radialGradient id="globe-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#581c87" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
      <linearGradient id="ring" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="11" fill="url(#globe-bg)" stroke="url(#ring)" strokeWidth="2" />
    <ellipse cx="16" cy="16" rx="5" ry="11" stroke="#e9d5ff" strokeWidth="1" strokeOpacity="0.7" fill="none" />
    <path d="M5 16 L27 16" stroke="#e9d5ff" strokeWidth="1" strokeOpacity="0.7" />
    <path d="M16 5 L16 27" stroke="#e9d5ff" strokeWidth="1" strokeOpacity="0.7" />
  </svg>
);

// 3D Band-Aid / Link Pill
const LinkIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="band" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#7e22ce" />
        <stop offset="50%" stopColor="#581c87" />
        <stop offset="100%" stopColor="#2e1065" />
      </linearGradient>
      <linearGradient id="pad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#3b0764" />
        <stop offset="100%" stopColor="#1a042e" />
      </linearGradient>
    </defs>
    <g transform="rotate(-30 16 16)">
      <rect x="5" y="11" width="22" height="10" rx="5" fill="url(#band)" stroke="#c084fc" strokeWidth="0.8" strokeOpacity="0.5" />
      <rect x="11" y="11" width="10" height="10" fill="url(#pad)" stroke="#a855f7" strokeWidth="1" />
      <circle cx="8" cy="14" r="0.8" fill="#c084fc" opacity="0.6" />
      <circle cx="8" cy="18" r="0.8" fill="#c084fc" opacity="0.6" />
      <circle cx="24" cy="14" r="0.8" fill="#c084fc" opacity="0.6" />
      <circle cx="24" cy="18" r="0.8" fill="#c084fc" opacity="0.6" />
      <path d="M13 13 L15 13 M17 13 L19 13 M13 19 L15 19 M17 19 L19 19" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </g>
  </svg>
);

// Faceted Purple Diamond
const DiamondIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_2px_12px_rgba(168,85,247,0.8)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="d-top" x1="0" y1="0" x2="0" y2="32"><stop offset="0%" stopColor="#f3e8ff"/><stop offset="100%" stopColor="#d8b4fe"/></linearGradient>
      <linearGradient id="d-mid" x1="0" y1="0" x2="32" y2="32"><stop offset="0%" stopColor="#c084fc"/><stop offset="100%" stopColor="#9333ea"/></linearGradient>
      <linearGradient id="d-bot" x1="0" y1="0" x2="0" y2="32"><stop offset="0%" stopColor="#7e22ce"/><stop offset="100%" stopColor="#3b0764"/></linearGradient>
    </defs>
    <path d="M8 9 L24 9 L28 14 L16 27 L4 14 Z" fill="url(#d-mid)" stroke="#f3e8ff" strokeWidth="0.5" strokeLinejoin="round" />
    <path d="M8 9 L24 9 L20 14 L12 14 Z" fill="url(#d-top)" stroke="#f3e8ff" strokeWidth="0.5" strokeLinejoin="round" />
    <path d="M12 14 L20 14 L16 27 Z" fill="url(#d-bot)" stroke="#f3e8ff" strokeWidth="0.5" strokeLinejoin="round" />
    <path d="M4 14 L12 14 L16 27 Z" fill="#6b21a8" fillOpacity="0.8" stroke="#f3e8ff" strokeWidth="0.5" strokeLinejoin="round" />
    <path d="M28 14 L20 14 L16 27 Z" fill="#581c87" fillOpacity="0.8" stroke="#f3e8ff" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);

// 3D Stacked Layers / Books
const StackIcon = () => (
  <svg className="w-8 h-8 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="s1" x1="0" y1="0" x2="32" y2="0"><stop offset="0%" stopColor="#4c1d95"/><stop offset="100%" stopColor="#2e1065"/></linearGradient>
      <linearGradient id="s2" x1="0" y1="0" x2="32" y2="0"><stop offset="0%" stopColor="#7e22ce"/><stop offset="100%" stopColor="#581c87"/></linearGradient>
      <linearGradient id="s3" x1="0" y1="0" x2="32" y2="0"><stop offset="0%" stopColor="#c084fc"/><stop offset="100%" stopColor="#9333ea"/></linearGradient>
    </defs>
    <rect x="7" y="8" width="16" height="4" rx="1" fill="url(#s1)" stroke="#c084fc" strokeWidth="0.5" />
    <rect x="5" y="14" width="16" height="4" rx="1" fill="url(#s2)" stroke="#e9d5ff" strokeWidth="0.5" />
    <rect x="9" y="20" width="16" height="4" rx="1" fill="url(#s3)" stroke="#ffffff" strokeWidth="0.5" />
  </svg>
);

const NAV_ITEMS = [
  { label: 'Prompt Studio', href: '/', Component: LightningIcon },
  { label: 'Dashboard', href: '/#dashboard', Component: ChartIcon },
  { label: 'AI Providers', href: '/providers', Component: GlobeIcon },
  { label: 'Integrations', href: '/integrations', Component: LinkIcon },
  { label: 'Pricing Plans', href: '/pricing', Component: DiamondIcon },
  { label: 'Documentation', href: '/docs', Component: StackIcon },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#080808] font-sans antialiased text-white flex selection:bg-[#a855f7]/30">
        <Providers>
          {/* 3D Glassmorphic Floating Pill Dock */}
          <div className="w-24 pl-6 py-8 flex flex-col shrink-0 items-center justify-center sticky top-0 h-screen z-50">
            <div className="w-16 bg-[#0c0c0c] border border-white/10 rounded-[28px] p-2.5 flex flex-col items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-2xl">
              
              {/* Brand Gem Button */}
              <Link href="/" className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-[1px] group mb-2">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_15px_rgba(168,85,247,0.5)] group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_25px_rgba(168,85,247,0.8)] transition-all">
                  <span className="text-black font-black text-xl leading-none">◈</span>
                </div>
              </Link>

              {/* Dock Divider */}
              <div className="w-8 h-px bg-white/10 my-1" />

              {/* 3D Glass Buttons */}
              {NAV_ITEMS.map(({ label, href, Component }) => (
                <div key={href} className="relative group/tooltip">
                  <Link
                    href={href}
                    className="block w-11 h-11 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-[1px] transition-transform active:scale-95 hover:scale-105"
                  >
                    <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0c] border border-black flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.5)] group-hover/tooltip:border-[#a855f7]/40 transition-all">
                      <Component />
                    </div>
                  </Link>

                  {/* Glassmorphic Popover Tooltip */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 rounded-xl bg-[#18181b] border border-white/10 text-xs font-bold text-white shadow-xl opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 pointer-events-none transition-all whitespace-nowrap z-50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative bg-[#080808]">
            <SmoothScroll>{children}</SmoothScroll>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
