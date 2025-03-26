import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
   const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
   });

   // Check if the request is for the admin area
   if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   // Check if the request is for the dashboard
   if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!token) {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   // Check if the request is for the company dashboard
   if (request.nextUrl.pathname.startsWith('/company-dashboard')) {
      if (!token || (token.role !== 'COMPANY' && token.role !== 'ADMIN')) {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   // Check if the request is for the profile page
   if (request.nextUrl.pathname.startsWith('/profile')) {
      if (!token) {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      '/admin/:path*',
      '/dashboard/:path*',
      '/company-dashboard/:path*',
      '/profile/:path*',
      '/api/:path*',
   ],
};
