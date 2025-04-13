'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { tagSchema } from '@/lib/admin-validations';
import { slugify } from '@/lib/utils';

export async function createTag(formData: FormData) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   // Validate form data
   const validatedFields = tagSchema.safeParse({
      name: formData.get('name'),
   });

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
   }

   const { name } = validatedFields.data;

   try {
      // Create slug from name
      const slug = slugify(name);

      // Check if slug already exists
      const existingTag = await prisma.tag.findUnique({
         where: { slug },
      });

      if (existingTag) {
         return { error: 'A tag with this name already exists' };
      }

      // Create the tag
      const tag = await prisma.tag.create({
         data: {
            name,
            slug,
         },
      });

      revalidatePath('/admin/blog/tags');
      revalidatePath('/blog');

      return { success: true, tag };
   } catch (error) {
      console.error('Error creating tag:', error);
      return { error: 'Failed to create tag' };
   }
}

export async function updateTag(id: string, formData: FormData) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   // Validate form data
   const validatedFields = tagSchema.safeParse({
      name: formData.get('name'),
   });

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
   }

   const { name } = validatedFields.data;

   try {
      // Create slug from name
      const slug = slugify(name);

      // Check if tag exists
      const existingTag = await prisma.tag.findUnique({
         where: { id },
      });

      if (!existingTag) {
         return { error: 'Tag not found' };
      }

      // Update the tag
      const tag = await prisma.tag.update({
         where: { id },
         data: {
            name,
            slug,
         },
      });

      revalidatePath('/admin/blog/tags');
      revalidatePath('/blog');

      return { success: true, tag };
   } catch (error) {
      console.error('Error updating tag:', error);
      return { error: 'Failed to update tag' };
   }
}

export async function deleteTag(id: string) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   try {
      // Check if tag exists
      const existingTag = await prisma.tag.findUnique({
         where: { id },
      });

      if (!existingTag) {
         return { error: 'Tag not found' };
      }

      // Delete the tag
      await prisma.tag.delete({
         where: { id },
      });

      revalidatePath('/admin/blog/tags');
      revalidatePath('/blog');

      return { success: true };
   } catch (error) {
      console.error('Error deleting tag:', error);
      return { error: 'Failed to delete tag' };
   }
}
