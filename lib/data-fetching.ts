import { cache } from 'react';
import prisma from '@/lib/prisma';
import type { Tool, Category, Tag, BlogPost, Company } from '@prisma/client';
import { withDb } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Cache the data fetching functions to avoid unnecessary database calls
export const getTools = cache(async (): Promise<Tool[]> => {
   return await withDb(() =>
      prisma.tool.findMany({
         include: {
            categories: true,
            tags: true,
            company: true,
            reviews: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
   );
});

export const getToolBySlug = cache(async (slug: string) => {
   return await withDb(() =>
      prisma.tool.findUnique({
         where: { slug },
         include: {
            categories: true,
            tags: true,
            company: true,
            reviews: {
               include: {
                  user: {
                     select: {
                        id: true,
                        name: true,
                        image: true,
                     },
                  },
               },
            },
         },
      })
   );
});

export const getToolsByCategory = cache(
   async (categorySlug: string): Promise<Tool[]> => {
      const category = await withDb(() =>
         prisma.category.findUnique({
            where: { slug: categorySlug },
            include: {
               tools: {
                  include: {
                     categories: true,
                     tags: true,
                     company: true,
                     reviews: true,
                  },
               },
            },
         })
      );

      return category?.tools || [];
   }
);

export const getToolsByTag = cache(async (tagSlug: string): Promise<Tool[]> => {
   const tag = await withDb(() =>
      prisma.tag.findUnique({
         where: { slug: tagSlug },
         include: {
            tools: {
               include: {
                  categories: true,
                  tags: true,
                  company: true,
                  reviews: true,
               },
            },
         },
      })
   );

   return tag?.tools || [];
});

export const getToolsByCompany = cache(
   async (companySlug: string): Promise<Tool[]> => {
      const company = await withDb(() =>
         prisma.company.findUnique({
            where: { slug: companySlug },
            include: {
               tools: {
                  include: {
                     categories: true,
                     tags: true,
                     reviews: true,
                  },
               },
            },
         })
      );

      return company?.tools || [];
   }
);

export const getCategories = cache(async (): Promise<Category[]> => {
   return await withDb(() =>
      prisma.category.findMany({
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
});

export const getCategoryBySlug = cache(async (slug: string) => {
   return await withDb(() =>
      prisma.category.findUnique({
         where: { slug },
         include: {
            tools: {
               include: {
                  categories: true,
                  tags: true,
                  company: true,
                  reviews: true,
               },
            },
         },
      })
   );
});

export const getTags = cache(async (): Promise<Tag[]> => {
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
});

export const getTagBySlug = cache(async (slug: string) => {
   return await withDb(() =>
      prisma.tag.findUnique({
         where: { slug },
         include: {
            tools: {
               include: {
                  categories: true,
                  tags: true,
                  company: true,
                  reviews: true,
               },
            },
         },
      })
   );
});

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
   return await withDb(() =>
      prisma.blogPost.findMany({
         include: {
            author: {
               select: {
                  id: true,
                  name: true,
                  image: true,
               },
            },
            categories: true,
            tags: true,
         },
         orderBy: {
            publishedAt: 'desc',
         },
         where: {
            published: true,
         },
      })
   );
});

export const getBlogPostBySlug = cache(async (slug: string) => {
   return await withDb(() =>
      prisma.blogPost.findUnique({
         where: { slug },
         include: {
            author: {
               select: {
                  id: true,
                  name: true,
                  image: true,
                  bio: true,
               },
            },
            categories: true,
            tags: true,
         },
      })
   );
});

export const getBlogPostsByCategory = cache(
   async (categorySlug: string): Promise<BlogPost[]> => {
      const category = await withDb(() =>
         prisma.category.findUnique({
            where: { slug: categorySlug },
            include: {
               blogPosts: {
                  include: {
                     author: {
                        select: {
                           id: true,
                           name: true,
                           image: true,
                        },
                     },
                     categories: true,
                     tags: true,
                  },
                  where: {
                     published: true,
                  },
                  orderBy: {
                     publishedAt: 'desc',
                  },
               },
            },
         })
      );

      return category?.blogPosts || [];
   }
);

export const getBlogPostsByTag = cache(
   async (tagSlug: string): Promise<BlogPost[]> => {
      const tag = await withDb(() =>
         prisma.tag.findUnique({
            where: { slug: tagSlug },
            include: {
               blogPosts: {
                  include: {
                     author: {
                        select: {
                           id: true,
                           name: true,
                           image: true,
                        },
                     },
                     categories: true,
                     tags: true,
                  },
                  where: {
                     published: true,
                  },
                  orderBy: {
                     publishedAt: 'desc',
                  },
               },
            },
         })
      );

      return tag?.blogPosts || [];
   }
);

export const getCompanies = cache(async (): Promise<Company[]> => {
   return await withDb(() =>
      prisma.company.findMany({
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
});

export const getCompanyBySlug = cache(async (slug: string) => {
   return await withDb(() =>
      prisma.company.findUnique({
         where: { slug },
         include: {
            tools: {
               include: {
                  categories: true,
                  tags: true,
                  reviews: true,
               },
            },
            users: {
               select: {
                  id: true,
                  name: true,
                  image: true,
                  role: true,
               },
            },
         },
      })
   );
});

export const getCompanyByUserId = cache(async (userId: string) => {
   const user = await withDb(() =>
      prisma.user.findUnique({
         where: { id: userId },
         include: {
            company: {
               include: {
                  tools: {
                     include: {
                        categories: true,
                        tags: true,
                        reviews: true,
                     },
                  },
                  users: {
                     select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true,
                     },
                  },
               },
            },
         },
      })
   );

   return user?.company;
});

export const getRelatedTools = cache(
   async (toolId: string, limit = 3): Promise<Tool[]> => {
      const tool = await withDb(() =>
         prisma.tool.findUnique({
            where: { id: toolId },
            include: {
               categories: true,
               tags: true,
            },
         })
      );

      if (!tool) return [];

      const categoryIds = tool.categories.map((category) => category.id);
      const tagIds = tool.tags.map((tag) => tag.id);

      return await withDb(() =>
         prisma.tool.findMany({
            where: {
               id: { not: toolId },
               OR: [
                  {
                     categories: {
                        some: {
                           id: { in: categoryIds },
                        },
                     },
                  },
                  {
                     tags: {
                        some: {
                           id: { in: tagIds },
                        },
                     },
                  },
               ],
            },
            include: {
               categories: true,
               tags: true,
               company: true,
               reviews: true,
            },
            take: limit,
         })
      );
   }
);

export const getPopularTools = cache(async (limit = 6): Promise<Tool[]> => {
   return await withDb(() =>
      prisma.tool.findMany({
         include: {
            categories: true,
            tags: true,
            company: true,
            reviews: true,
         },
         orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
         take: limit,
      })
   );
});

export const getRecentTools = cache(async (limit = 6): Promise<Tool[]> => {
   return await withDb(() =>
      prisma.tool.findMany({
         include: {
            categories: true,
            tags: true,
            company: true,
            reviews: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
         take: limit,
      })
   );
});

export const getPopularCategories = cache(
   async (limit = 6): Promise<Category[]> => {
      return await withDb(() =>
         prisma.category.findMany({
            include: {
               _count: {
                  select: {
                     tools: true,
                  },
               },
            },
            orderBy: {
               tools: {
                  _count: 'desc',
               },
            },
            take: limit,
         })
      );
   }
);

export const getUserById = cache(async (id: string) => {
   return await withDb(() =>
      prisma.user.findUnique({
         where: { id },
         include: {
            company: true,
            reviews: {
               include: {
                  tool: true,
               },
            },
         },
      })
   );
});

export const getUserByEmail = cache(async (email: string) => {
   return await withDb(() =>
      prisma.user.findUnique({
         where: { email },
         include: {
            company: true,
         },
      })
   );
});

export const getReviewsByToolId = cache(async (toolId: string) => {
   return await withDb(() =>
      prisma.review.findMany({
         where: { toolId },
         include: {
            user: {
               select: {
                  id: true,
                  name: true,
                  image: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
   );
});

export const getReviewsByUserId = cache(async (userId: string) => {
   return await withDb(() =>
      prisma.review.findMany({
         where: { userId },
         include: {
            tool: {
               include: {
                  categories: true,
                  company: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
   );
});

export const getDashboardStats = cache(async (companyId?: string) => {
   // Base query for tools
   const toolsQuery = companyId ? { where: { companyId } } : {};

   // Get total tools count
   const totalTools = await withDb(() => prisma.tool.count(toolsQuery));

   // Get total views
   const toolsWithViews = await withDb(() =>
      prisma.tool.findMany({
         ...toolsQuery,
         select: {
            viewCount: true,
         },
      })
   );

   const totalViews = toolsWithViews.reduce(
      (sum, tool) => sum + (tool.viewCount || 0),
      0
   );

   // Get total reviews
   const reviewsQuery = companyId ? { where: { tool: { companyId } } } : {};

   const totalReviews = await withDb(() => prisma.review.count(reviewsQuery));

   // Get average rating
   const reviewsWithRating = await withDb(() =>
      prisma.review.findMany({
         ...reviewsQuery,
         select: {
            rating: true,
         },
      })
   );

   const averageRating =
      reviewsWithRating.length > 0
         ? reviewsWithRating.reduce((sum, review) => sum + review.rating, 0) /
           reviewsWithRating.length
         : 0;

   // Get total clicks
   const toolsWithClicks = await withDb(() =>
      prisma.tool.findMany({
         ...toolsQuery,
         select: {
            clickCount: true,
         },
      })
   );

   const totalClicks = toolsWithClicks.reduce(
      (sum, tool) => sum + (tool.clickCount || 0),
      0
   );

   return {
      totalTools,
      totalViews,
      totalReviews,
      averageRating,
      totalClicks,
   };
});

export const getAdminStats = cache(async () => {
   const totalUsers = await withDb(() => prisma.user.count());
   const totalCompanies = await withDb(() => prisma.company.count());
   const totalTools = await withDb(() => prisma.tool.count());
   const totalBlogPosts = await withDb(() => prisma.blogPost.count());
   const totalCategories = await withDb(() => prisma.category.count());
   const totalTags = await withDb(() => prisma.tag.count());
   const totalReviews = await withDb(() => prisma.review.count());

   // Get users registered in the last 30 days
   const thirtyDaysAgo = new Date();
   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

   const newUsers = await withDb(() =>
      prisma.user.count({
         where: {
            createdAt: {
               gte: thirtyDaysAgo,
            },
         },
      })
   );

   // Get tools added in the last 30 days
   const newTools = await withDb(() =>
      prisma.tool.count({
         where: {
            createdAt: {
               gte: thirtyDaysAgo,
            },
         },
      })
   );

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
});

export const getToolDetail = cache(async (slug: string) => {
   const session = await getServerSession(authOptions);

   const tool = await prisma.tool.findUnique({
      where: { slug },
      include: {
         categories: {
            include: {
               category: true,
            },
         },
         company: true,
         plans: true,
         _count: {
            select: {
               views: true,
               savedBy: true,
               reviews: true,
            },
         },
         savedBy: session?.user?.id
            ? {
                 where: {
                    userId: session.user.id,
                 },
              }
            : false,
         reviews: {
            include: {
               user: true,
            },
            orderBy: {
               createdAt: 'desc',
            },
            take: 5,
         },
      },
   });

   if (!tool) {
      return null;
   }

   // Record view if user is logged in
   if (session?.user?.id) {
      await prisma.toolView.create({
         data: {
            userId: session.user.id,
            toolId: tool.id,
         },
      });
   }

   // Get related tools
   const categoryIds = tool.categories.map((c) => c.categoryId);
   const relatedTools = await prisma.tool.findMany({
      where: {
         id: { not: tool.id },
         categories: {
            some: {
               categoryId: { in: categoryIds },
            },
         },
      },
      include: {
         categories: {
            include: {
               category: true,
            },
         },
         _count: {
            select: {
               savedBy: true,
            },
         },
         savedBy: session?.user?.id
            ? {
                 where: {
                    userId: session.user.id,
                 },
              }
            : false,
      },
      take: 3,
   });

   return {
      tool: {
         ...tool,
         savedByCurrentUser: tool.savedBy && tool.savedBy.length > 0,
      },
      relatedTools: relatedTools.map((relatedTool) => ({
         ...relatedTool,
         savedByCurrentUser:
            relatedTool.savedBy && relatedTool.savedBy.length > 0,
      })),
   };
});
