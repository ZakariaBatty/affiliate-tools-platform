import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

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
