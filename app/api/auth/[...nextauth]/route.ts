import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import { compare } from 'bcrypt';
import { withDb } from '@/lib/db';
import prisma from '@/lib/prisma';

declare module 'next-auth' {
   interface Session {
      user: {
         id: string;
         email: string;
         name: string;
         role: string;
         image?: string | null;
      };
   }

   interface User {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
   }
}

export const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_CLIENT_ID!,
         clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
               throw new Error('Email and password are required');
            }

            try {
               const user = await withDb(() =>
                  prisma.user.findUnique({
                     where: { email: credentials.email },
                  })
               );

               if (!user) {
                  throw new Error('User not found');
               }

               if (!user.password) {
                  throw new Error('Password not set for this account');
               }

               const isPasswordValid = await compare(
                  credentials.password,
                  user.password
               );

               if (!isPasswordValid) {
                  throw new Error('Incorrect password');
               }

               return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.image,
                  role: user.role,
               };
            } catch (error: any) {
               console.error('Auth error:', error);
               throw new Error(error.message || 'Authentication failed');
            }
         },
      }),
   ],
   callbacks: {
      async signIn({ user, account }) {
         if (account?.provider === 'github' || account?.provider === 'google') {
            try {
               const existingUser = await withDb(() =>
                  prisma.user.findUnique({
                     where: { email: user.email! },
                  })
               );

               if (!existingUser) {
                  await withDb(() =>
                     prisma.user.create({
                        data: {
                           name: user.name || 'New User',
                           email: user.email!,
                           image: user.image,
                           emailVerified: new Date(),
                        },
                     })
                  );
               }
            } catch (error) {
               console.error('Error saving user:', error);
               return false;
            }
         }
         return true;
      },
      async jwt({ token, user }) {
         if (user) {
            return {
               ...token,
               id: user.id,
               role: user.role,
               email: user.email,
               name: user.name,
               image: user.image,
            };
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.image = token.image as string;
         }
         return session;
      },
   },
   pages: {
      signIn: '/',
   },
   session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
   },
   cookies: {
      sessionToken: {
         name: 'next-auth.session-token',
         options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
         },
      },
   },
   debug: process.env.NODE_ENV === 'development',
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
