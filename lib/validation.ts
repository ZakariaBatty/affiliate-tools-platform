import { z } from 'zod';

// Login form schema
export const loginSchema = z.object({
   email: z.string().email({ message: 'Please enter a valid email address' }),
   password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
});

// Register form schema
export const registerSchema = z
   .object({
      name: z
         .string()
         .min(2, { message: 'Name must be at least 2 characters' }),
      email: z
         .string()
         .email({ message: 'Please enter a valid email address' }),
      password: z
         .string()
         .min(8, { message: 'Password must be at least 8 characters' }),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   });

// Reset password schema
export const resetSchema = z.object({
   email: z.string().email({ message: 'Please enter a valid email address' }),
});

// New password schema
export const newPasswordSchema = z
   .object({
      password: z
         .string()
         .min(8, { message: 'Password must be at least 8 characters' }),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   });
