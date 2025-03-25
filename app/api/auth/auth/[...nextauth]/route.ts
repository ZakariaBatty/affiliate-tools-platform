import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';

declare module 'next-auth' {
   interface Session {
      user: {
         id: string;
         email: string;
         name: string;
         role: string;
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
            // check data
            if (!credentials?.email || !credentials.password) {
               return null;
            }

            // find user
            const user = await prisma.user.findUnique({
               where: { email: credentials.email },
            });

            // check user if null or password null
            if (!user || !user.password) {
               return null;
            }

            //  compare password if correct
            const isPasswordValid = await compare(
               credentials.password,
               user.password
            );

            // check if password valid
            if (!isPasswordValid) {
               return null;
            }

            // return data user
            return {
               id: user.id,
               name: user.name,
               email: user.email,
               image: user.image,
               role: user.role,
            };
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.role = user.role;
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            session.user.id = token.sub as string;
            session.user.role = token.role as string;
         }
         return session;
      },
   },
   pages: {
      signIn: '/',
      error: '/',
   },
   session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
   },
   cookies: {
      sessionToken: {
         name: `__Secure-next-auth.session-token`,
         options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
         },
      },
   },
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
