'use server';

import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Register a new user
export async function registerUser({
   name,
   email,
   password,
}: {
   name: string;
   email: string;
   password: string;
}) {
   try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser) {
         return {
            success: false,
            message: 'User with this email already exists',
         };
      }

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create user
      const user = await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
         },
      });

      return {
         success: true,
         message: 'User registered successfully',
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
         },
      };
   } catch (error) {
      console.error('Registration error:', error);
      return {
         success: false,
         message: 'Failed to register user',
      };
   }
}

// Request password reset
export async function requestPasswordReset(email: string) {
   try {
      // Check if user exists
      const user = await prisma.user.findUnique({
         where: { email },
      });

      if (!user) {
         // For security reasons, don't reveal that the user doesn't exist
         return {
            success: true,
            message:
               'If an account with that email exists, a reset link has been sent',
         };
      }

      // Generate reset token
      const token = uuidv4();
      const expires = new Date(Date.now() + 3600000); // 1 hour

      // Save token to database
      await prisma.passwordReset.upsert({
         where: { userId: user.id },
         update: {
            token,
            expires,
         },
         create: {
            userId: user.id,
            token,
            expires,
         },
      });

      // In a real application, you would send an email with the reset link
      // For this example, we'll just return success
      console.log(`Reset token for ${email}: ${token}`);

      return {
         success: true,
         message: 'Password reset email sent',
      };
   } catch (error) {
      console.error('Reset request error:', error);
      return {
         success: false,
         message: 'Failed to process reset request',
      };
   }
}

// Reset password with token
export async function resetPassword({
   token,
   password,
}: {
   token: string;
   password: string;
}) {
   try {
      // Find valid token
      const resetRecord = await prisma.passwordReset.findFirst({
         where: {
            token,
            expires: {
               gt: new Date(),
            },
         },
         include: {
            user: true,
         },
      });

      if (!resetRecord) {
         return {
            success: false,
            message: 'Invalid or expired reset token',
         };
      }

      // Hash new password
      const hashedPassword = await hash(password, 10);

      // Update user password
      await prisma.user.update({
         where: { id: resetRecord.userId },
         data: {
            password: hashedPassword,
         },
      });

      // Delete used token
      await prisma.passwordReset.delete({
         where: { id: resetRecord.id },
      });

      return {
         success: true,
         message: 'Password reset successfully',
      };
   } catch (error) {
      console.error('Password reset error:', error);
      return {
         success: false,
         message: 'Failed to reset password',
      };
   }
}

// Update user profile
export async function updateUserProfile({
   userId,
   name,
   email,
   currentPassword,
   newPassword,
}: {
   userId: string;
   name?: string;
   email?: string;
   currentPassword?: string;
   newPassword?: string;
}) {
   try {
      const updateData: any = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;

      // If changing password, verify current password
      if (currentPassword && newPassword) {
         const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { password: true },
         });

         if (!user || !user.password) {
            return {
               success: false,
               message: 'User not found',
            };
         }

         const isPasswordValid = await compare(currentPassword, user.password);

         if (!isPasswordValid) {
            return {
               success: false,
               message: 'Current password is incorrect',
            };
         }

         updateData.password = await hash(newPassword, 10);
      }

      // Update user
      await prisma.user.update({
         where: { id: userId },
         data: updateData,
      });

      return {
         success: true,
         message: 'Profile updated successfully',
      };
   } catch (error) {
      console.error('Profile update error:', error);
      return {
         success: false,
         message: 'Failed to update profile',
      };
   }
}
