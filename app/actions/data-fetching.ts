import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// Home page data
export async function getFeaturedTools() {
   const session = await getServerSession(authOptions);

   const featuredTools = await prisma.tool.findMany({
      where: { featured: true },
      include: {
         categories: {
            include: {
               category: true,
            },
         },
         savedBy: session?.user?.id
            ? {
                 where: { userId: session.user.id },
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
      rating: tool.rating || 4.5,
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

   if (!categories || categories.length === 0) {
      console.warn('No categories found!');
      return [];
   }
   return categories;
}

export async function getFeaturedBlogPosts() {
   const posts = await prisma.blog.findMany({
      where: {
         published: true,
         featured: true,
      },
      include: {
         author: true,
         categories: {
            include: {
               category: true, // Ensure this relation exists
            },
         },
         tags: {
            include: {
               tag: true, // Ensure this relation exists
            },
         },
      },
      take: 6,
   });

   if (!posts || posts.length === 0) {
      console.warn('No blog posts found!');
      return [];
   }

   // Prevent errors if categories or tags are missing
   return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || 'Read more about this topic on our blog.',
      image: post.imageUrl || '/placeholder.svg?height=400&width=600',
      date: post.createdAt
         ? new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
           })
         : 'Unknown date',
      readTime: `${post.readingTime || 7} min read`,
      category:
         post.categories.length > 0
            ? post.categories[0]?.category.name
            : 'General',
      author: post.author
         ? {
              name: post.author?.name || 'Unknown',
              avatar:
                 post.author?.image || '/placeholder.svg?height=100&width=100',
              role: 'Author',
           }
         : {
              name: 'Unknown',
              avatar: '/placeholder.svg?height=100&width=100',
              role: 'Author',
           },
      tags: post.tags.length > 0 ? post.tags.map((tag) => tag.tag.name) : [],
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

   if (!tools || tools.length === 0) {
      console.warn('No tools found!');
      return [];
   }

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

   if (!categories || categories.length === 0) {
      console.warn('No categories found!');
      return [];
   }

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
         // plans: true,
         _count: {
            select: {
               views: true,
               savedBy: true,
               // reviews: true,
            },
         },
         savedBy: session?.user?.id
            ? {
                 where: {
                    userId: session.user.id,
                 },
              }
            : false,
         // reviews: {
         //    include: {
         //       user: true,
         //    },
         //    take: 5,
         //    orderBy: {
         //       createdAt: 'desc',
         //    },
         // },
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
}
