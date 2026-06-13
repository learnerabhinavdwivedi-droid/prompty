'use client';

import { useState } from 'react';

const INSTALL_CMD = 'curl -fsSL # | bash';

function InstallButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="bg-white/5 border border-[#a855f7]/30 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.1)]">
      <p className="text-xs font-black text-[#a855f7] uppercase tracking-wider mb-3">
        One-command install
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <code className="flex-1 w-full text-sm font-mono text-white bg-black/60 px-4 py-3 rounded-xl border border-white/10 truncate">
          {INSTALL_CMD}
        </code>
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-all bg-[#a855f7] text-black hover:bg-[#9333ea] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          {copied ? '✓ Copied' : 'Copy Command'}
        </button>
      </div>
      <p className="text-xs text-[#888888] mt-3 font-semibold">
        Requires Node.js &middot; Works on macOS and Linux &middot; No npm install needed
      </p>
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px bg-white/10 my-10" />;
}

function SectionHeader({ children }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1 bg-white/10" />
      <h2 className="text-xl font-bold text-white tracking-tight">{children}</h2>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function Badge({ label }) {
  return (
    <span className="text-[10px] font-black tracking-wider text-black bg-[#a855f7] px-2.5 py-1 rounded-full uppercase ml-3 align-middle shadow-[0_0_15px_rgba(168,85,247,0.4)]">
      {label}
    </span>
  );
}

function CodeWindow({ filename, children }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-[#a855f7]/80" />
        </div>
        <span className="ml-3 text-xs text-[#888888] font-mono font-semibold">{filename}</span>
      </div>
      <pre className="p-6 text-sm font-mono text-[#c0c0c0] overflow-x-auto leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }) {
  return (
    <code className="text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded-md text-xs font-mono font-bold border border-[#a855f7]/20">
      {children}
    </code>
  );
}

export default function IntegrationsPage() {
  return (
    <main className="pt-16 pb-24 px-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#a855f7]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto py-12 relative z-10">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-xs font-black uppercase tracking-widest text-[#a855f7] mb-3">
            ◈ Seamless Pipeline Architecture
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Integrations</h1>
          <p className="text-base text-[#888888] max-w-2xl mx-auto font-medium">
            TokenShrink plugs into your existing workflow. No new tools to learn. No changes to how you work.
          </p>
        </div>

        <SectionDivider />

        {/* Claude Code */}
        <section className="py-8 space-y-6">
          <SectionHeader>Claude Code Hook</SectionHeader>

          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">Claude Code</h3>
              <Badge label="Hook" />
            </div>
            <p className="text-sm text-[#888888] font-semibold">
              Automatically compresses every prompt you send.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-xs font-black text-[#a855f7] mb-2 uppercase tracking-wider">
              How it works
            </h4>
            <p className="text-sm text-white/80 leading-relaxed">
              A <InlineCode>UserPromptSubmit</InlineCode> hook intercepts your message before it reaches Claude, compresses it with TokenShrink, and passes the compressed version — saving tokens on every single turn.
            </p>
          </div>

          <InstallButton />

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-xs font-black text-[#a855f7] mb-3 uppercase tracking-wider">
              What you get
            </h4>
            <ul className="text-sm text-white/80 space-y-2.5 font-medium">
              <li className="flex items-center gap-3">
                <span className="text-[#a855f7]">⚡</span> Every prompt automatically compressed before it reaches Claude
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#a855f7]">💰</span> Token savings counter in your Claude Code status bar
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#a855f7]">📋</span> Per-session log at <InlineCode>~/.claude/.tokenshrink-log.jsonl</InlineCode>
              </li>
            </ul>
          </div>

          <details className="group bg-white/5 border border-white/10 rounded-2xl p-6">
            <summary className="text-sm font-bold text-white cursor-pointer list-none flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-[#a855f7]">◈</span> Manual install steps
              </span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-6 space-y-8 pt-4 border-t border-white/10">
              <div className="flex gap-6 items-start">
                <div className="text-2xl font-black text-[#a855f7] font-mono leading-none pt-0.5">01</div>
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-white font-semibold">
                    Download the hook to <InlineCode>~/.claude/hooks/</InlineCode>
                  </p>
                  <CodeWindow filename="terminal">{`curl -fsSL # \\
  -o ~/.claude/hooks/tokenshrink-compress.js`}</CodeWindow>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="text-2xl font-black text-[#a855f7] font-mono leading-none pt-0.5">02</div>
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-white font-semibold">
                    Register it in <InlineCode>~/.claude/settings.json</InlineCode>
                  </p>
                  <CodeWindow filename="~/.claude/settings.json">{`{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node $HOME/.claude/hooks/tokenshrink-compress.js"
          }
        ]
      }
    ]
  }
}`}</CodeWindow>
                </div>
              </div>
            </div>
          </details>
        </section>

        <SectionDivider />

        {/* OpenClaw */}
        <section className="py-8 space-y-6">
          <SectionHeader>OpenClaw</SectionHeader>

          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">OpenClaw</h3>
              <Badge label="SDK" />
            </div>
            <p className="text-sm text-[#888888] font-semibold">
              Compress conversation history before routing to your agents.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-xs font-black text-[#a855f7] mb-2 uppercase tracking-wider">
              What is OpenClaw
            </h4>
            <p className="text-sm text-white/80 leading-relaxed">
              OpenClaw is a Discord-to-AI gateway that routes messages to local agents. TokenShrink&apos;s <InlineCode>compressHistory()</InlineCode> reduces the token cost of every conversation before it hits your Ollama models.
            </p>
          </div>

          <CodeWindow filename="openclaw-handler.js">{`import { compressHistory } from 'tokenshrink';

// Before sending conversation to your agent
const { messages, stats } = compressHistory(conversationHistory);
console.log(\`Saved \${stats.totalTokensSaved} tokens this turn\`);

// Pass compressed messages to Ollama or any OpenAI-compatible API
const response = await fetch('#', {
  method: 'POST',
  body: JSON.stringify({
    model: 'your-model',
    messages: messages,
  }),
});`}</CodeWindow>

          <div className="bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-xs font-black text-[#a855f7] mb-2 uppercase tracking-wider">Note</h4>
            <p className="text-sm text-white/90">
              Works with any Ollama model. Compression happens locally — no data leaves your machine.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* SDK */}
        <section className="py-8 space-y-6">
          <SectionHeader>SDK</SectionHeader>

          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">Any Application</h3>
              <Badge label="NPM" />
            </div>
            <p className="text-sm text-[#888888] font-semibold">Two functions. Works with every LLM.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CodeWindow filename="single-prompt.js">{`// Single prompt
import { compress } from 'tokenshrink';

const { compressed, stats } = compress(myPrompt);
// → stats.tokensSaved
// → stats.ratio`}</CodeWindow>

            <CodeWindow filename="conversation.js">{`// Full conversation history
import { compressHistory } from 'tokenshrink';

const { messages, stats } = compressHistory(history);
// → stats.totalTokensSaved
// → stats.messagesCompressed`}</CodeWindow>
          </div>

          <div className="text-center pt-6">
            <code className="text-sm font-black text-[#a855f7] bg-[#a855f7]/10 px-6 py-4 rounded-xl border border-[#a855f7]/30 font-mono shadow-[0_0_20px_rgba(168,85,247,0.15)] inline-block">
              npm install tokenshrink
            </code>
          </div>
        </section>

      </div>
    </main>
  );
}
