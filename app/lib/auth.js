import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';
import { users } from '@/schema/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "je3wpQT/Sq3E1rNDElok3klK/ehd5DAtp0ymokmAA2Q=",
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'raj@prompty.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email || 'raj@prompty.com';
          const dbUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
          if (dbUser.length > 0) {
            return {
              id: dbUser[0].id,
              email: dbUser[0].email,
              name: dbUser[0].name || 'Raj',
              plan: dbUser[0].plan || 'advanced',
            };
          } else {
            const [newUser] = await db.insert(users).values({
              email,
              name: 'Raj',
              provider: 'credentials',
              plan: 'advanced',
            }).returning();
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name || 'Raj',
              plan: newUser.plan || 'advanced',
            };
          }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        // Fetch database UUID for consistency across OAuth and Credentials users
        try {
          const dbUser = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email))
            .limit(1);
          if (dbUser.length > 0) {
            token.id = dbUser[0].id;
            token.plan = dbUser[0].plan || 'advanced';
          } else {
            token.id = user.id;
            token.plan = user.plan || 'advanced';
          }
        } catch (e) {
          console.error('[Auth] JWT DB lookup failed, falling back to token defaults:', e?.message);
          token.id = user.id;
          token.plan = user.plan || 'advanced';
        }
      }
      if (account?.provider && account.provider !== 'credentials') {
        token.provider = account.provider;
      }
      return token;
    },
    async signIn({ user, account }) {
      // Credentials login — authorize() already handled DB upsert
      if (account?.provider === 'credentials') {
        return true;
      }

      // OAuth providers — upsert user into DB, but NEVER block sign-in on DB failure
      try {
        if (!user?.email) return true; // Edge case: no email from provider

        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existing.length === 0) {
          await db.insert(users).values({
            email: user.email,
            name: user.name || 'User',
            image: user.image || null,
            provider: account?.provider || 'oauth',
            plan: 'advanced',
          });
        }
      } catch (e) {
        // Log but NEVER block sign-in — user can still authenticate even if DB is down
        console.error('[Auth] signIn DB upsert failed (non-blocking):', e?.message);
      }

      return true; // Always allow sign-in
    },
    async session({ session, token }) {
      // Initialize session.user if undefined to avoid crash
      if (!session) {
        session = {};
      }
      if (!session.user) {
        session.user = {};
      }

      if (token?.id === 'dev-local-1') {
        return {}; // Force logout of corrupted fallback sessions
      }

      // Enrich session from JWT token first (fast path)
      if (token?.id) {
        session.user.id = token.id;
        session.user.plan = token.plan || 'advanced';
      }

      // Then try to enrich from DB (may have fresher plan/stripe data)
      if (session?.user?.email) {
        try {
          const dbUser = await db
            .select()
            .from(users)
            .where(eq(users.email, session.user.email))
            .limit(1);

          if (dbUser.length > 0) {
            session.user.id = dbUser[0].id;
            session.user.plan = dbUser[0].plan;
            session.user.stripeCustomerId = dbUser[0].stripeCustomerId;
          }
        } catch (e) {
          // DB error — use JWT token values already set above
          console.error('[Auth] session DB lookup failed, using token fallback:', e?.message);
        }
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
});
