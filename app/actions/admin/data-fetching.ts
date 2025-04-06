import prisma from '@/lib/prisma';

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
