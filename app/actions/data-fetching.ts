'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type {
   GetFeaturedToolsResponse,
   GetPopularCategoriesResponse,
   GetFeaturedBlogPostsResponse,
   GetAllToolsResponse,
   GetAllCategoriesResponse,
   GetToolDetailResponse,
   GetAllBlogPostsResponse,
   GetFeaturedBlogPostsForSliderResponse,
   GetBlogCategoriesResponse,
   GetBlogTagsResponse,
   GetBlogPostDetailResponse,
   GetPricingPlansResponse,
} from '@/types';

// Home page data
export async function getFeaturedTools(): Promise<GetFeaturedToolsResponse> {
   const session = await getServerSession(authOptions);

   const featuredTools = await prisma.tool.findMany({
      where: {
         featured: true,
      },
      include: {
         categories: {
            include: {
               category: true,
            },
         },
         ratings: true, // Include ratings
         savedBy: session?.user?.id
            ? {
                 where: {
                    userId: session.user.id,
                 },
              }
            : false,
      },
      take: 6,
   });

   return featuredTools.map((tool) => {
      // Calculate average rating
      const avgRating =
         tool.ratings.length > 0
            ? tool.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
              tool.ratings.length
            : 0;

      return {
         id: tool.id,
         name: tool.name,
         slug: tool.slug,
         image: tool.imageUrl || '/placeholder.svg',
         category: tool.categories[0]?.category.name || 'General',
         rating: Number(avgRating.toFixed(1)), // Round to 1 decimal place
         ratingCount: tool.ratings.length,
         savedByCurrentUser: tool.savedBy && tool.savedBy.length > 0,
      };
   });
}

export async function getPopularCategories(): Promise<GetPopularCategoriesResponse> {
   const categories = await prisma.category.findMany({
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
      take: 8,
   });

   return categories;
}

export async function getFeaturedBlogPosts(): Promise<GetFeaturedBlogPostsResponse> {
   const posts = await prisma.blog.findMany({
      where: {
         published: true,
         featured: true,
      },
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
      },
      take: 8,
   });

   return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || 'Read more about this topic on our blog.',
      image: post.coverImage || '/placeholder.svg?height=400&width=600',
      date: new Date(post.createdAt).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      readTime: `${post.readingTime || 7} min read`,
      category: post.categories[0]?.category.name || 'General',
      author: post.author || null,
      tags: post.tags.map((tag) => tag.tag.name),
   }));
}

// Tools page data
export async function getAllTools(): Promise<GetAllToolsResponse> {
   const session = await getServerSession(authOptions);

   const tools = await prisma.tool.findMany({
      include: {
         categories: {
            include: {
               category: true,
            },
         },
         company: true,
         ratings: true, // Include ratings
         _count: {
            select: {
               views: true,
               savedBy: true,
               ratings: true,
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
   });

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
         ratingCount: tool.ratings.length,
         savedByCurrentUser: tool.savedBy && tool.savedBy.length > 0,
      };
   });
}

export async function getAllCategories(): Promise<GetAllCategoriesResponse> {
   const categories = await prisma.category.findMany({
      include: {
         _count: {
            select: {
               tools: true,
            },
         },
      },
   });

   return categories;
}

// Tool detail page data
export async function getToolDetail(
   slug: string
): Promise<GetToolDetailResponse> {
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
         ratings: {
            include: {
               user: true,
            },
         },
         _count: {
            select: {
               views: true,
               savedBy: true,
               ratings: true,
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

   // Calculate average rating
   const avgRating =
      tool.ratings.length > 0
         ? tool.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
           tool.ratings.length
         : 0;

   // Calculate rating distribution (1-5 stars)
   const ratingDistribution: Record<string, number> = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
   };

   tool.ratings.forEach((rating) => {
      if (rating.rating >= 1 && rating.rating <= 5) {
         ratingDistribution[rating.rating.toString()]++;
      }
   });

   // Calculate percentage for each rating
   const ratingPercentages: Record<string, number> = {};
   if (tool.ratings.length > 0) {
      Object.keys(ratingDistribution).forEach((key) => {
         ratingPercentages[key] = Math.round(
            (ratingDistribution[key] / tool.ratings.length) * 100
         );
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
         ratings: true,
         _count: {
            select: {
               views: true,
               savedBy: true,
               ratings: true,
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

   // Calculate ratings for related tools
   const relatedToolsWithRatings = relatedTools.map((relatedTool) => {
      const relatedAvgRating =
         relatedTool.ratings.length > 0
            ? relatedTool.ratings.reduce(
                 (sum, rating) => sum + rating.rating,
                 0
              ) / relatedTool.ratings.length
            : 0;

      return {
         ...relatedTool,
         avgRating: Number(relatedAvgRating.toFixed(1)),
         ratingCount: relatedTool.ratings.length,
         savedByCurrentUser:
            relatedTool.savedBy && relatedTool.savedBy.length > 0,
      };
   });

   return {
      tool: {
         ...tool,
         avgRating: Number(avgRating.toFixed(1)),
         ratingDistribution,
         ratingPercentages,
         savedByCurrentUser: tool.savedBy && tool.savedBy.length > 0,
         // Format ratings for display
         formattedRatings: tool.ratings.map((rating) => ({
            id: rating.id,
            rating: rating.rating,
            review: rating.review,
            createdAt: rating.createdAt,
            user: {
               id: rating.user.id,
               name: rating.user.name,
               image: rating.user.image,
            },
         })),
      },
      relatedTools: relatedToolsWithRatings,
   };
}

// Blog page data
export async function getAllBlogPosts(): Promise<GetAllBlogPostsResponse> {
   const posts = await prisma.blog.findMany({
      where: {
         published: true,
      },
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
            },
         },
      },
      orderBy: {
         createdAt: 'desc',
      },
   });

   return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || 'Read more about this topic on our blog.',
      image: post.coverImage || '/placeholder.svg?height=400&width=600',
      date: new Date(post.createdAt).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      readTime: `${post.readingTime || 5} min read`,
      category: post.categories[0]?.category.name || 'General',
      author:
         typeof post.author === 'object' && post.author !== null
            ? post.author
            : {
                 name: 'Anonymous',
                 author: {
                    name: 'Anonymous',
                    image: '/placeholder.svg?height=100&width=100',
                    bio: 'Author bio',
                    role: 'Author',
                 },
                 role: 'Author',
              },
      tags: post.tags.map((tag) => tag.tag.name),
   }));
}

export async function getFeaturedBlogPostsForSlider(): Promise<GetFeaturedBlogPostsForSliderResponse> {
   const posts = await prisma.blog.findMany({
      where: {
         published: true,
         featured: true,
      },
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
      },
      take: 5,
   });

   return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || 'Read more about this topic on our blog.',
      image: post.coverImage || '/placeholder.svg?height=400&width=600',
      date: new Date(post.createdAt).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      readTime: `${post.readingTime || 5} min read`,
      category: post.categories[0]?.category.name || 'General',
      author: post.author || {
         name: 'Anonymous',
         image: '/placeholder.svg?height=100&width=100',
         role: 'Author',
      },
      tags: post.tags.map((tag) => tag.tag.name),
   }));
}

export async function getBlogCategories(): Promise<GetBlogCategoriesResponse> {
   // Changed from blogCategory to category with blog relation filter
   const categories = await prisma.category.findMany({
      include: {
         _count: {
            select: {
               blogs: true, // Changed from posts to blogs
            },
         },
         blogs: true, // Include blogs to filter categories with blog posts
      },
      orderBy: {
         blogs: {
            _count: 'desc',
         },
      },
   });

   return categories.filter((category) => category.blogs.length > 0);
}

export async function getBlogTags(): Promise<GetBlogTagsResponse> {
   // Changed from blogTag to tag with blog relation filter
   const tags = await prisma.tag.findMany({
      include: {
         _count: {
            select: {
               blogs: true, // Changed from posts to blogs
            },
         },
         blogs: true, // Include blogs to filter tags with blog posts
      },
      orderBy: {
         blogs: {
            _count: 'desc',
         },
      },
      take: 15,
   });

   return tags.filter((tag) => tag.blogs.length > 0);
}

// Blog detail page data
export async function getBlogPostDetail(
   slug: string
): Promise<GetBlogPostDetailResponse> {
   const session = await getServerSession(authOptions);

   const post = await prisma.blog.findUnique({
      where: { slug },
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
   });

   if (!post) {
      return null;
   }

   // Record view if user is logged in
   if (session?.user?.id) {
      await prisma.blogView.create({
         data: {
            userId: session.user.id,
            blogId: post.id,
         },
      });
   }

   // Get related posts
   const categoryIds = post.categories.map((c) => c.categoryId);
   const tagIds = post.tags.map((t) => t.tagId);

   const relatedPosts = await prisma.blog.findMany({
      where: {
         id: { not: post.id },
         published: true,
         OR: [
            {
               categories: {
                  some: {
                     categoryId: { in: categoryIds },
                  },
               },
            },
            {
               tags: {
                  some: {
                     tagId: { in: tagIds },
                  },
               },
            },
         ],
      },
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
      },
      take: 3,
   });

   return {
      post: {
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
      },
      relatedPosts: relatedPosts.map((relatedPost) => ({
         id: relatedPost.id,
         title: relatedPost.title,
         slug: relatedPost.slug,
         excerpt:
            relatedPost.excerpt || 'Read more about this topic on our blog.',
         image:
            relatedPost.coverImage || '/placeholder.svg?height=400&width=600',
         date: new Date(relatedPost.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
         }),
         readTime: `${relatedPost.readingTime || 5} min read`,
         category: relatedPost.categories[0]?.category.name || 'General',
         author: relatedPost.author || {
            name: 'Anonymous',
            image: '/placeholder.svg?height=100&width=100',
            role: 'Author',
         },
         tags: relatedPost.tags.map((tag) => tag.tag.name),
      })),
   };
}

// Pricing page data
export async function getPricingPlans(): Promise<GetPricingPlansResponse> {
   const session = await getServerSession(authOptions);

   const plans = await prisma.plan.findMany({
      orderBy: {
         price: 'asc',
      },
   });

   // Get user's current plan if logged in
   let userPlan = null;
   if (session?.user?.id) {
      const subscription = await prisma.subscriptions.findFirst({
         where: {
            userId: session.user.id,
            status: 'completed', // Changed from ACTIVE to completed based on schema
         },
         include: {
            plan: true,
         },
      });

      if (subscription) {
         userPlan = subscription.plan;
      }
   }

   return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      interval: plan.interval,
      features: plan.features
         ? typeof plan.features === 'string'
            ? JSON.parse(plan.features)
            : plan.features
         : [],
      isPopular: plan.isPopular,
      isCurrent: userPlan?.id === plan.id,
   }));
}
