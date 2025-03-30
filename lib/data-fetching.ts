import { cache } from "react"
import prisma from "@/lib/prisma"
import type { Tool, Category, Tag, BlogPost, Company } from "@prisma/client"

// Cache the data fetching functions to avoid unnecessary database calls
export const getTools = cache(async (): Promise<Tool[]> => {
  return await prisma.tool.findMany({
    include: {
      categories: true,
      tags: true,
      company: true,
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
})

export const getToolBySlug = cache(async (slug: string) => {
  return await prisma.tool.findUnique({
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
})

export const getToolsByCategory = cache(async (categorySlug: string): Promise<Tool[]> => {
  const category = await prisma.category.findUnique({
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

  return category?.tools || []
})

export const getToolsByTag = cache(async (tagSlug: string): Promise<Tool[]> => {
  const tag = await prisma.tag.findUnique({
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

  return tag?.tools || []
})

export const getToolsByCompany = cache(async (companySlug: string): Promise<Tool[]> => {
  const company = await prisma.company.findUnique({
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

  return company?.tools || []
})

export const getCategories = cache(async (): Promise<Category[]> => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          tools: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
})

export const getCategoryBySlug = cache(async (slug: string) => {
  return await prisma.category.findUnique({
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
})

export const getTags = cache(async (): Promise<Tag[]> => {
  return await prisma.tag.findMany({
    include: {
      _count: {
        select: {
          tools: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
})

export const getTagBySlug = cache(async (slug: string) => {
  return await prisma.tag.findUnique({
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
})

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return await prisma.blogPost.findMany({
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
      publishedAt: "desc",
    },
    where: {
      published: true,
    },
  })
})

export const getBlogPostBySlug = cache(async (slug: string) => {
  return await prisma.blogPost.findUnique({
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
})

export const getBlogPostsByCategory = cache(async (categorySlug: string): Promise<BlogPost[]> => {
  const category = await prisma.category.findUnique({
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
          publishedAt: "desc",
        },
      },
    },
  })

  return category?.blogPosts || []
})

export const getBlogPostsByTag = cache(async (tagSlug: string): Promise<BlogPost[]> => {
  const tag = await prisma.tag.findUnique({
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
          publishedAt: "desc",
        },
      },
    },
  })

  return tag?.blogPosts || []
})

export const getCompanies = cache(async (): Promise<Company[]> => {
  return await prisma.company.findMany({
    include: {
      _count: {
        select: {
          tools: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })
})

export const getCompanyBySlug = cache(async (slug: string) => {
  return await prisma.company.findUnique({
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
})

export const getCompanyByUserId = cache(async (userId: string) => {
  const user = await prisma.user.findUnique({
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

  return user?.company
})

export const getRelatedTools = cache(async (toolId: string, limit = 3): Promise<Tool[]> => {
  const tool = await prisma.tool.findUnique({
    where: { id: toolId },
    include: {
      categories: true,
      tags: true,
    },
  })

  if (!tool) return []

  const categoryIds = tool.categories.map((category) => category.id)
  const tagIds = tool.tags.map((tag) => tag.id)

  return await prisma.tool.findMany({
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
})

export const getPopularTools = cache(async (limit = 6): Promise<Tool[]> => {
  return await prisma.tool.findMany({
    include: {
      categories: true,
      tags: true,
      company: true,
      reviews: true,
    },
    orderBy: [{ viewCount: "desc" }, { createdAt: "desc" }],
    take: limit,
  })
})

export const getRecentTools = cache(async (limit = 6): Promise<Tool[]> => {
  return await prisma.tool.findMany({
    include: {
      categories: true,
      tags: true,
      company: true,
      reviews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  })
})

export const getPopularCategories = cache(async (limit = 6): Promise<Category[]> => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          tools: true,
        },
      },
    },
    orderBy: {
      tools: {
        _count: "desc",
      },
    },
    take: limit,
  })
})

export const getUserById = cache(async (id: string) => {
  return await prisma.user.findUnique({
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
})

export const getUserByEmail = cache(async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      company: true,
    },
  })
})

export const getReviewsByToolId = cache(async (toolId: string) => {
  return await prisma.review.findMany({
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
      createdAt: "desc",
    },
  })
})

export const getReviewsByUserId = cache(async (userId: string) => {
  return await prisma.review.findMany({
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
      createdAt: "desc",
    },
  })
})

export const getDashboardStats = cache(async (companyId?: string) => {
  // Base query for tools
  const toolsQuery = companyId ? { where: { companyId } } : {}

  // Get total tools count
  const totalTools = await prisma.tool.count(toolsQuery)

  // Get total views
  const toolsWithViews = await prisma.tool.findMany({
    ...toolsQuery,
    select: {
      viewCount: true,
    },
  })

  const totalViews = toolsWithViews.reduce((sum, tool) => sum + (tool.viewCount || 0), 0)

  // Get total reviews
  const reviewsQuery = companyId ? { where: { tool: { companyId } } } : {}

  const totalReviews = await prisma.review.count(reviewsQuery)

  // Get average rating
  const reviewsWithRating = await prisma.review.findMany({
    ...reviewsQuery,
    select: {
      rating: true,
    },
  })

  const averageRating =
    reviewsWithRating.length > 0
      ? reviewsWithRating.reduce((sum, review) => sum + review.rating, 0) / reviewsWithRating.length
      : 0

  // Get total clicks
  const toolsWithClicks = await prisma.tool.findMany({
    ...toolsQuery,
    select: {
      clickCount: true,
    },
  })

  const totalClicks = toolsWithClicks.reduce((sum, tool) => sum + (tool.clickCount || 0), 0)

  return {
    totalTools,
    totalViews,
    totalReviews,
    averageRating,
    totalClicks,
  }
})

export const getAdminStats = cache(async () => {
  const totalUsers = await prisma.user.count()
  const totalCompanies = await prisma.company.count()
  const totalTools = await prisma.tool.count()
  const totalBlogPosts = await prisma.blogPost.count()
  const totalCategories = await prisma.category.count()
  const totalTags = await prisma.tag.count()
  const totalReviews = await prisma.review.count()

  // Get users registered in the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const newUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  })

  // Get tools added in the last 30 days
  const newTools = await prisma.tool.count({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  })

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
  }
})

