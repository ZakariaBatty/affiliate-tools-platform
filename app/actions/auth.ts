'use server';

import { hash } from 'bcrypt';
import { generateServerCsrfToken } from '@/lib/csrf';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/lib/validation';
import { cookies } from 'next/headers';

export async function register(formData: FormData) {
   // Get the CSRF token from the form data
   const storedToken = formData.get('csrfToken') as string;

   // Get the CSRF token from the cookie
   const csrfCookie = (await cookies()).get('csrf-token')?.value;

   // if (!storedToken || !csrfCookie || storedToken !== csrfCookie) {
   //    return { error: 'Invalid CSRF token' };
   // }

   // validate form data
   const validatedFields = registerSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      csrfToken: formData.get('csrfToken'),
   });

   // check if validation was successful
   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
   }

   //  continue with registration
   const { name, email, password } = validatedFields.data;

   try {
      // check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
         return { error: 'Email already in use' };
      }

      // hash password
      const hashedPassword = await hash(password, 10);

      // Create user
      const user = await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
         },
      });
      // Generate new CSRF token
      generateServerCsrfToken();

      return {
         success: true,
         user: { id: user.id, name: user.name, email: user.email },
      };
   } catch (error) {
      console.error('Error registering user:', error);
      return { error: 'Failed to register user' };
   }
}
