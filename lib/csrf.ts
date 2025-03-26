import { nanoid } from 'nanoid';

// This version works in both client and server contexts
export function generateClientCsrfToken() {
   const token = nanoid(32);
   document.cookie = `csrf-token=${token}; path=/; max-age=3600; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
   }`;
   return token;
}

// Keep this for server components in the App Router
export async function generateServerCsrfToken() {
   // This should only be imported and used in server components
   const { cookies } = await import('next/headers');

   const token = nanoid(32);

   (await cookies()).set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
   });
   return token;
}
