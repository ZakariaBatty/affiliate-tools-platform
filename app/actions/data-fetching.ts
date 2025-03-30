'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Home page data
export async function getFeaturedTools() {
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

   return featuredTools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      image: tool.imageUrl || '/placeholder.svg',
      category: tool.categories[0]?.category.name || 'General',
      rating: 4.5,
      savedByCurrentUser: tool.savedBy && tool.savedBy.length > 0,
   }));
}

export async function getPopularCategories() {
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

export async function getFeaturedBlogPosts() {
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
      take: 3,
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
export async function getAllTools() {
   const session = await getServerSession(authOptions);

   const tools = await prisma.tool.findMany({
      include: {
         categories: {
            include: {
               category: true,
            },
         },
         company: true,
         _count: {
            select: {
               views: true,
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
   });

   return tools.map((tool) => ({
      ...tool,
      savedByCurrentUser: tool.savedBy && tool.savedBy.length > 0,
   }));
}

export async function getAllCategories() {
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
export async function getToolDetail(slug: string) {
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
            take: 5,
            orderBy: {
               createdAt: 'desc',
            },
         },
      },
   });

   if (!tool) {
      return null;
   }

   // Record view if user is logged in
   if (session?.user?.id) {
      await prisma.views.create({
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
}

// Blog page data
export async function getAllBlogPosts() {
   const posts = await prisma.Blog.findMany({
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
      author: {
         name: post.author.name,
         avatar: post.author.image || '/placeholder.svg?height=100&width=100',
         role: 'Author',
      },
      tags: post.tags.map((tag) => tag.tag.name),
   }));
}

export async function getFeaturedBlogPostsForSlider() {
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
      author: {
         name: post.author.name,
         avatar: post.author.image || '/placeholder.svg?height=100&width=100',
         role: 'Author',
      },
      tags: post.tags.map((tag) => tag.tag.name),
   }));
}

export async function getBlogCategories() {
   const categories = await prisma.blogCategory.findMany({
      include: {
         _count: {
            select: {
               posts: true,
            },
         },
      },
      orderBy: {
         posts: {
            _count: 'desc',
         },
      },
   });

   return categories;
}

export async function getBlogTags() {
   const tags = await prisma.blogTag.findMany({
      include: {
         _count: {
            select: {
               posts: true,
            },
         },
      },
      orderBy: {
         posts: {
            _count: 'desc',
         },
      },
      take: 15,
   });

   return tags;
}

// Blog detail page data
export async function getBlogPostDetail(slug: string) {
   const session = await getServerSession(authOptions);

   const post = await prisma.blog.findUnique({
      where: { slug },
      include: {
         author: true,
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
               likes: true,
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
      await prisma.view.create({
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
         author: true,
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
         likeCount: post._count.likes,
         commentCount: post._count.comments,
         author: {
            id: post.author.id,
            name: post.author.name,
            image: post.author.image,
            bio: post.author.bio,
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
         author: {
            name: relatedPost.author.name,
            avatar:
               relatedPost.author.image ||
               '/placeholder.svg?height=100&width=100',
            role: 'Author',
         },
         tags: relatedPost.tags.map((tag) => tag.tag.name),
      })),
   };
}

// Pricing page data
export async function getPricingPlans() {
   const session = await getServerSession(authOptions);

   const plans = await prisma.plan.findMany({
      orderBy: {
         price: 'asc',
      },
   });

   // Get user's current plan if logged in
   let userPlan = null;
   if (session?.user?.id) {
      const subscription = await prisma.subscription.findFirst({
         where: {
            userId: session.user.id,
            status: 'ACTIVE',
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
      features: plan.features ? JSON.parse(plan.features) : [],
      isPopular: plan.isPopular,
      isCurrent: userPlan?.id === plan.id,
   }));
}
