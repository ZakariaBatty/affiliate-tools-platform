import { withDb } from '@/lib/db';
import prisma from '@/lib/prisma';
import { formatDate, isValidAuthor } from '@/lib/utils';
import {
   Category,
   GetAllBlogPostsResponse,
   GetAllBlogPostsResponseFull,
   GetAllToolsResponseAdmin,
   Tag,
} from '@/types';

export const getAdminStats = async () => {
   const totalUsers = await prisma.user.count();
   const totalCompanies = await prisma.company.count();
   const totalTools = await prisma.tool.count();
   const totalBlogPosts = await prisma.blog.count();
   const totalCategories = await prisma.category.count();
   const totalTags = await prisma.tag.count();
   const totalReviews = await prisma.toolRating.count();

   // Get users registered in the last 30 days
   const thirtyDaysAgo = new Date();
   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

   const newUsers = await prisma.user.count({
      where: {
         createdAt: {
            gte: thirtyDaysAgo,
         },
      },
   });

   // Get tools added in the last 30 days
   const newTools = await prisma.tool.count({
      where: {
         createdAt: {
            gte: thirtyDaysAgo,
         },
      },
   });

   return {
      totalUsers,
      totalCompanies,
      totalTools,
      totalBlogPosts,
      totalCategories,
      totalTags,
      totalReviews,
      newUsers,
      newTools,
   };
};

//  page tools
export const getAllToolsAdmin = async (): Promise<GetAllToolsResponseAdmin> => {
   const tools = await withDb(() =>
      prisma.tool.findMany({
         include: {
            categories: {
               include: {
                  category: true,
               },
            },
            tags: {
               include: {
                  tag: true,
               },
            },
            company: true,
            ratings: true,
            _count: {
               select: {
                  views: true,
                  savedBy: true,
                  ratings: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
   );

   return tools.map((tool) => {
      // Calculate average rating
      const avgRating =
         tool.ratings.length > 0
            ? tool.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
              tool.ratings.length
            : 0;

      return {
         ...tool,
         avgRating: Number(avgRating.toFixed(1)), // Round to 1 decimal place
      };
   });
};

export const getALLBlogsAdmin =
   async (): Promise<GetAllBlogPostsResponseFull> => {
      const posts = await withDb(() =>
         prisma.blog.findMany({
            include: {
               categories: {
                  include: {
                     category: true,
                  },
               },
               tags: {
                  include: {
                     tag: true,
                  },
               },
               _count: {
                  select: {
                     views: true,
                     comments: true,
                  },
               },
               comments: {
                  include: {
                     user: true,
                  },
                  orderBy: {
                     createdAt: 'desc',
                  },
                  take: 10,
               },
            },
            orderBy: {
               createdAt: 'desc',
            },
         })
      );
      return posts.map((post) => ({
         id: post.id,
         title: post.title,
         slug: post.slug,
         content: post.content,
         excerpt: post.excerpt,
         coverImage: post.coverImage,
         createdAt: post.createdAt,
         updatedAt: post.updatedAt,
         readingTime: post.readingTime,
         viewCount: post._count.views,
         commentCount: post._count.comments,
         published: post.published,
         featured: post.featured,
         author:
            post.author &&
            typeof post.author === 'object' &&
            'name' in post.author &&
            'image' in post.author
               ? (post.author as {
                    name: string;
                    image: string;
                    bio?: string;
                    role?: string;
                 })
               : {
                    name: 'Anonymous',
                    image: '/placeholder.svg?height=100&width=100',
                    bio: 'Author bio',
                 },
         categories: post.categories.map((c) => ({
            id: c.category.id,
            name: c.category.name,
            slug: c.category.slug,
         })),
         tags: post.tags.map((t) => ({
            id: t.tag.id,
            name: t.tag.name,
            slug: t.tag.slug,
         })),
         comments: post.comments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            user: {
               id: comment.user.id,
               name: comment.user.name,
               image: comment.user.image,
            },
         })),
      }));
   };

export const getCategoriesAdmin = async (): Promise<Category[]> => {
   return await withDb(() =>
      prisma.category.findMany({
         orderBy: {
            name: 'asc',
         },
      })
   );
};

export const getCategoriesWithCount = async (): Promise<Category[]> => {
   return await withDb(() =>
      prisma.category.findMany({
         include: {
            _count: {
               select: {
                  blogs: true,
                  tools: true,
               },
            },
         },
         orderBy: {
            name: 'desc',
         },
      })
   );
};

export const getTagsWithCount = async (): Promise<Tag[]> => {
   return await withDb(() =>
      prisma.tag.findMany({
         include: {
            _count: {
               select: {
                  blogs: true,
                  tools: true,
               },
            },
         },
         orderBy: {
            name: 'desc',
         },
      })
   );
};
export const getTags = async (): Promise<Tag[]> => {
   return await withDb(() =>
      prisma.tag.findMany({
         include: {
            _count: {
               select: {
                  tools: true,
               },
            },
         },
         orderBy: {
            name: 'asc',
         },
      })
   );
};
