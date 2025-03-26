import { type NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getToken } from 'next-auth/jwt';

// CSRF protection middleware
export async function csrfMiddleware(req: NextRequest) {
   // Skip for GET, HEAD, OPTIONS requests
   if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return NextResponse.next();
   }

   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   // If user is not authenticated, skip CSRF check
   if (!token) {
      return NextResponse.next();
   }

   const csrfToken = req.headers.get('x-csrf-token');
   const storedToken = req.cookies.get('csrf-token')?.value;

   if (!csrfToken || !storedToken || csrfToken !== storedToken) {
      return new NextResponse(JSON.stringify({ error: 'Invalid CSRF token' }), {
         status: 403,
         headers: { 'Content-Type': 'application/json' },
      });
   }
   // Generate a new CSRF token for the next request
   const newCsrfToken = nanoid(32);
   const response = NextResponse.next();

   response.cookies.set('csrf-token', newCsrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
   });

   return response;
}
