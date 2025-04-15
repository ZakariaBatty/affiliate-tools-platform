import { withDb } from '@/lib/db';
import prisma from '@/lib/prisma';

// New functions for CRUD operations
export const createBlogPost = async (data: any) => {
   return await withDb(() =>
      prisma.blog.create({
         data: {
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt,
            coverImage:
               data.coverImage || '/placeholder.svg?height=300&width=600',
            readingTime: data.readingTime || 5,
            published: data.published,
            featured: data.featured || false,
            author: data.author,
            categories: {
               create: data.categoryIds.map((categoryId: string) => ({
                  category: {
                     connect: {
                        id: categoryId,
                     },
                  },
               })),
            },
            tags: {
               create: data.tagIds.map((tagId: string) => ({
                  tag: {
                     connect: {
                        id: tagId,
                     },
                  },
               })),
            },
         },
      })
   );
};

export const updateBlogPost = async (id: string, data: any) => {
   // First, delete existing category and tag relationships
   await withDb(() =>
      prisma.blogCategory.deleteMany({
         where: {
            blogId: id,
         },
      })
   );

   await withDb(() =>
      prisma.blogTag.deleteMany({
         where: {
            blogId: id,
         },
      })
   );

   // Then update the blog post with new relationships
   return await withDb(() =>
      prisma.blog.update({
         where: {
            id,
         },
         data: {
            title: data.title,
            slug: data.slug,
            content: data.content,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            readingTime: data.readingTime,
            published: data.published,
            featured: data.featured,
            updatedAt: new Date(),
            categories: {
               create: data.categoryIds.map((categoryId: string) => ({
                  category: {
                     connect: {
                        id: categoryId,
                     },
                  },
               })),
            },
            tags: {
               create: data.tagIds.map((tagId: string) => ({
                  tag: {
                     connect: {
                        id: tagId,
                     },
                  },
               })),
            },
         },
      })
   );
};

export const deleteBlogPost = async (id: string) => {
   // First, delete related records
   await withDb(() =>
      prisma.blogCategory.deleteMany({
         where: {
            blogId: id,
         },
      })
   );

   await withDb(() =>
      prisma.blogTag.deleteMany({
         where: {
            blogId: id,
         },
      })
   );

   await withDb(() =>
      prisma.blogComment.deleteMany({
         where: {
            blogId: id,
         },
      })
   );

   await withDb(() =>
      prisma.blogView.deleteMany({
         where: {
            blogId: id,
         },
      })
   );

   // Then delete the blog post
   return await withDb(() =>
      prisma.blog.delete({
         where: {
            id,
         },
      })
   );
};
