import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TokenShrink — Same AI, Fewer Tokens';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          border: '4px solid #a855f7',
        }}
      >
        {/* Shrinkray triangle */}
        <svg width="80" height="80" viewBox="0 0 32 32">
          <path d="M8 22 L16 8 L24 22 Z" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinejoin="round"/>
          <line x1="12" y1="18" x2="20" y2="18" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
          <line x1="14" y1="14" x2="18" y2="14" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 800,
            color: '#fafafa',
            marginTop: 24,
            letterSpacing: '-0.02em',
          }}
        >
          Token
          <span style={{ color: '#a855f7' }}>Shrink</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#a1a1aa',
            marginTop: 16,
          }}
        >
          Same AI, fewer tokens. Open source SaaS.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            marginTop: 40,
            fontSize: 20,
            color: '#71717a',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#a855f7', fontWeight: 700 }}>~35%</span> token savings
          </span>
          <span style={{ color: '#3f3f46' }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#a855f7', fontWeight: 700 }}>&lt;20ms</span> latency
          </span>
          <span style={{ color: '#3f3f46' }}>|</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#a855f7', fontWeight: 700 }}>Rosetta</span> Enigma Codec
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 18,
            color: '#c084fc',
            background: '#18181b',
            padding: '8px 20px',
            borderRadius: 8,
            border: '1px solid #a855f7',
          }}
        >
          npm install tokenshrink
        </div>
      </div>
    ),
    { ...size }
  );
}
