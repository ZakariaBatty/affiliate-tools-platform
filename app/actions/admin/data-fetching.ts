import { withDb } from '@/lib/db';
import prisma from '@/lib/prisma';
import { Category, GetAllToolsResponseAdmin, Tag } from '@/types';

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

export const getCategoriesAdmin = async (): Promise<Category[]> => {
   return await withDb(() =>
      prisma.category.findMany({
         orderBy: {
            name: 'asc',
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
