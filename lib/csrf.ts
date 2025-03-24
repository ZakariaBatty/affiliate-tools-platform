import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function generateCsrfToken() {
   const token = nanoid(32);
   const cookieStore = await cookies();
   cookieStore.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
   });
   return token;
}
