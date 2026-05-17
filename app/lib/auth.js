import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';
import { users } from '@/schema/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        try {
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
              plan: 'advanced',
            }).returning();
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name || 'Raj',
              plan: newUser.plan || 'advanced',
            };
          }
        } catch (e) {
          // Fallback if Neon DB is not configured — 100% local dev mode
          return {
            id: 'dev-local-1',
            email,
            name: 'Raj (Local Mode)',
            plan: 'advanced',
          };
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true;
      }
      try {
        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existing.length === 0) {
          await db.insert(users).values({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            plan: 'advanced',
          });
        }
        return true;
      } catch (e) {
        console.error('Auth signIn error:', e);
        return false;
      }
    },
    async session({ session, token }) {
      if (token?.id === 'dev-local-1') {
        session.user.id = 'dev-local-1';
        session.user.plan = 'advanced';
        session.user.name = 'Raj (Local Mode)';
        return session;
      }
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
          // DB error fallback
          session.user.id = token?.id || 'dev-local-1';
          session.user.plan = token?.plan || 'advanced';
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
