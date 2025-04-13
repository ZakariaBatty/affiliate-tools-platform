'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { categorySchema } from '@/lib/admin-validations';
import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
   // check role user
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      throw new Error('Unauthorized');
   }

   // validate form data
   const validatedFields = categorySchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      icon: formData.get('icon'),
   });

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
   }

   // extract data from formData
   const { name, description, icon } = validatedFields.data;

   // try catch
   try {
      // create slug from name
      const slug = slugify(name);

      // check if category already existsv
      const existingCategory = await prisma.category.findUnique({
         where: { slug },
      });

      if (existingCategory) {
         return { error: 'A category with this name already exists' };
      }
      // create category
      const category = await prisma.category.create({
         data: {
            name,
            slug,
            description: description || undefined,
            icon: icon || undefined,
         },
      });

      // revalidate category cache
      revalidatePath('/admin/categories');
      revalidatePath('/tools');

      // return success message
      return { success: true, category };
   } catch (error) {
      // check if error is unique constraint error
      if (
         error instanceof Error &&
         error.message.includes('Unique constraint failed')
      ) {
         return { error: 'Category already exists' };
      }
      // return error message
      return { error: 'Something went wrong' };
   }
}

export async function updateCategory(id: string, formData: FormData) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   // Validate form data
   const validatedFields = categorySchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      icon: formData.get('icon'),
   });

   if (!validatedFields.success) {
      return { error: validatedFields.error.flatten().fieldErrors };
   }

   const { name, description, icon } = validatedFields.data;

   try {
      // Check if category exists
      const existingCategory = await prisma.category.findUnique({
         where: { id },
      });

      if (!existingCategory) {
         return { error: 'Category not found' };
      }

      // Update the category
      const category = await prisma.category.update({
         where: { id },
         data: {
            name,
            description: description || undefined,
            icon,
         },
      });

      revalidatePath('/admin/categories');
      revalidatePath('/tools');

      return { success: true, category };
   } catch (error) {
      console.error('Error updating category:', error);
      return { error: 'Failed to update category' };
   }
}

export async function deleteCategory(id: string) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   try {
      // Check if category exists
      const existingCategory = await prisma.category.findUnique({
         where: { id },
      });

      if (!existingCategory) {
         return { error: 'Category not found' };
      }

      // Delete the category
      await prisma.category.delete({
         where: { id },
      });

      revalidatePath('/admin/categories');
      revalidatePath('/tools');

      return { success: true };
   } catch (error) {
      console.error('Error deleting category:', error);
      return { error: 'Failed to delete category' };
   }
}
