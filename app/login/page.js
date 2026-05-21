'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

// Inner component that uses useSearchParams — must be wrapped in Suspense
function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const callbackUrl = next?.startsWith('/') ? next : '/dashboard';

  const [email, setEmail] = useState('abhinav@tokenshrink.com');
  const [password, setPassword] = useState('supersecret');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: true,
      });
      // If redirect:true, this won't be reached on success
      if (result?.error) {
        setError('Sign in failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setError('');
    try {
      await signIn(provider, { callbackUrl });
    } catch (err) {
      setError(`Failed to sign in with ${provider}.`);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <Link href="/" className="flex items-center justify-center gap-2 mb-10 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#7e22ce] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <span className="text-black font-bold text-lg leading-none">◈</span>
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">
          Token<span className="text-[#a855f7]">Shrink</span>
        </span>
      </Link>

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-[#888888]">
            Sign in to your TokenShrink account.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#888888] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#888888] mb-2">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-[#a855f7] to-[#c084fc] text-black font-bold rounded-xl text-sm hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              'Sign In ⚡'
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-[#666666] font-medium uppercase tracking-wider">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            id="login-github-btn"
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={loading}
            className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-xs hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>

          <button
            id="login-google-btn"
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-xs hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>

        <p className="text-xs text-[#666666] text-center mt-6">
          Built by{' '}
          <a
            href="https://github.com/learnerabhinavdwivedi-droid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a855f7] hover:text-[#c084fc] transition-colors"
          >
            Abhinav Dwivedi
          </a>
          {' '}· NextAuth v5 + Neon Postgres
        </p>
      </div>
    </div>
  );
}

// Suspense boundary required for useSearchParams in Next.js 14/15
export default function LoginPage() {
  return (
    <div className="min-h-screen flex-1 flex items-center justify-center px-6 bg-[#080808] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#a855f7] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
