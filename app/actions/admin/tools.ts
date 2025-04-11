'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { toolSchema } from '@/lib/admin-validations';
import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { ToolFormData } from '@/types/forms';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function createTool(data: ToolFormData) {
   const session = await getServerSession(authOptions);

   // Check if user has permission to create this tool
   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   const parsed = toolSchema.safeParse(data);

   if (!parsed.success) {
      return {
         error: parsed.error.format(),
      };
   }

   const {
      name,
      description,
      longDescription,
      imageUrl,
      logo,
      website,
      verified,
      featured,
      categories,
      pricing,
      features,
      companyId,
      tags,
   } = parsed.data;

   // Create slug from name
   const slug = slugify(name);
   // Check if slug already exists
   const existingTool = await prisma.tool.findUnique({
      where: { slug },
   });

   if (existingTool) {
      return { error: 'A tool with this name already exists' };
   }
   //  create tool in db
   const tool = await prisma.tool.create({
      data: {
         name,
         slug,
         description,
         longDescription,
         website,
         logo,
         companyId: companyId || undefined,
         imageUrl,
         verified,
         featured: session.user.role === 'ADMIN' ? featured : false,
         pricing,
         features,
         categories: {
            create: categories.map((categoryId) => ({
               category: {
                  connect: { id: categoryId },
               },
            })),
         },
         tags:
            tags && tags.length > 0
               ? {
                    create: tags.map((tagId) => ({
                       tag: {
                          connect: { id: tagId },
                       },
                    })),
                 }
               : undefined,
      },
   });

   //  revord activity
   await prisma.activity.create({
      data: {
         userId: 'cm9445e030000vg1cry85qrv2',
         action: 'CREATED_TOOL',
         toolId: tool.id,
      },
   });

   revalidatePath('/tools');
   revalidatePath('/admin/tools');
   //  return success message})
   return { success: true, tool };
}

export async function updateTool(id: string, data: ToolFormData) {
   const session = await getServerSession(authOptions);

   // Check if user has permission to update this tool
   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   // Check if tool exists
   const existingTool = await prisma.tool.findUnique({
      where: { id },
   });

   if (!existingTool) {
      return { error: 'Tool not found' };
   }

   const parsed = toolSchema.safeParse(data);

   // Validate form data
   if (!parsed.success) {
      return {
         error: parsed.error.format(),
      };
   }

   const {
      name,
      description,
      longDescription,
      imageUrl,
      logo,
      website,
      verified,
      featured,
      categories,
      pricing,
      features,
      companyId,
      tags,
   } = parsed.data;

   // Create slug from name
   const slug = slugify(name);

   try {
      // Update the tool
      const tool = await prisma.tool.update({
         where: { id },
         data: {
            name,
            slug,
            description,
            longDescription,
            website,
            logo,
            companyId: companyId || undefined,
            imageUrl,
            verified,
            featured: session.user.role === 'ADMIN' ? featured : false,
            pricing,
            features,
            categories: {
               deleteMany: {},
               create: categories.map((categoryId) => ({
                  category: {
                     connect: { id: categoryId },
                  },
               })),
            },
            tags: {
               deleteMany: {},
               create:
                  tags && tags.length > 0
                     ? tags.map((tagId) => ({
                          tag: {
                             connect: { id: tagId },
                          },
                       }))
                     : [],
            },
            updatedAt: new Date(),
         },
      });

      // Record activity
      await prisma.activity.create({
         data: {
            userId: session.user.id,
            action: 'UPDATED_TOOL',
            toolId: tool.id,
         },
      });

      revalidatePath(`/tools/${existingTool.slug}`);
      revalidatePath('/tools');
      revalidatePath('/admin/tools');

      return { success: true, tool };
   } catch (error) {
      console.error('Error updating tool:', error);
      return { error: 'Failed to update tool' };
   }
}

export async function deleteTool(id: string) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
   }

   // Check if tool exists
   const existingTool = await prisma.tool.findUnique({
      where: { id },
   });

   if (!existingTool) {
      return { error: 'Tool not found' };
   }

   try {
      // Delete the tool
      await prisma.tool.delete({
         where: { id },
      });

      // Record activity
      await prisma.activity.create({
         data: {
            userId: session.user.id,
            action: 'DELETED_TOOL',
            metadata: { toolName: existingTool.name },
         },
      });

      revalidatePath('/tools');
      revalidatePath('/admin/tools');

      return { success: true };
   } catch (error) {
      console.error('Error deleting tool:', error);
      return { error: 'Failed to delete tool' };
   }
}
