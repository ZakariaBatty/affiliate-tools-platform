import type { Role, Status } from '@prisma/client';

// User types
export interface User {
   id: string;
   name: string | null;
   email: string;
   emailVerified: Date | null;
   image: string | null;
   role: Role;
   status: Status;
   createdAt: Date;
   updatedAt: Date;
}

// Tool types
export interface ToolBasic {
   id: string;
   name: string;
   slug: string;
   image: string;
   category: string;
   rating: number;
   ratingCount?: number;
   savedByCurrentUser: boolean;
}

// Update the ToolTag interface to match the actual structure
export interface ToolTag {
   tagId: string;
   toolId: string;
   createdAt: Date;
}

// Update the ToolCategory interface to match the actual structure
export interface ToolCategory {
   categoryId: string;
   toolId: string;
   createdAt: Date;
   category: Category;
}

// Update the ToolFull interface to match the actual structure
export interface ToolFull {
   id: string;
   name: string;
   slug: string;
   description: string;
   longDescription: string;
   website: string;
   logo: string | null;
   imageUrl: string | null;
   companyId: string | null;
   verified: boolean;
   featured: boolean;
   pricing: any;
   features: any;
   createdAt: Date;
   updatedAt: Date;
   categories: {
      categoryId: string;
      toolId: string;
      createdAt: Date;
      category: Category;
   }[];
   tags?: {
      tagId: string;
      toolId: string;
      createdAt: Date;
   }[];
   company?: Company | null;
   ratings: {
      id: string;
      toolId: string;
      userId: string;
      rating: number;
      review: string | null;
      createdAt: Date;
      user?: {
         id: string;
         name: string | null;
         image: string | null;
      };
   }[];
   avgRating: number;
   ratingCount: number;
   ratingDistribution?: Record<string, number>;
   ratingPercentages?: Record<string, number>;
   savedByCurrentUser: boolean;
   formattedRatings?: ToolRatingWithUser[];
   _count?: {
      views: number;
      savedBy: number;
      ratings: number;
   };
   savedBy?: any[];
}

export interface ToolRatingWithUser {
   id: string;
   rating: number;
   review: string | null;
   createdAt: Date;
   user: {
      id: string;
      name: string | null;
      image: string | null;
   };
}

// Update the ToolCategory interface to match the actual structure

// Update the ToolTag interface to match the actual structure

// Update the ToolDetailResponse interface to match the actual structure
export interface ToolDetailResponse {
   tool: {
      id: string;
      name: string;
      slug: string;
      description: string;
      longDescription: string;
      website: string;
      logo: string | null;
      imageUrl: string | null;
      companyId: string | null;
      verified: boolean;
      featured: boolean;
      pricing: any;
      features: any;
      createdAt: Date;
      updatedAt: Date;
      categories: {
         categoryId: string;
         toolId: string;
         createdAt: Date;
         category: Category;
      }[];
      company: Company | null;
      ratings: {
         id: string;
         toolId: string;
         userId: string;
         rating: number;
         review: string | null;
         createdAt: Date;
         user: {
            id: string;
            name: string | null;
            image: string | null;
         };
      }[];
      _count: {
         views: number;
         savedBy: number;
         ratings: number;
      };
      savedBy: any[];
      avgRating: number;
      ratingDistribution: Record<string, number>;
      ratingPercentages: Record<string, number>;
      savedByCurrentUser: boolean;
      formattedRatings: ToolRatingWithUser[];
   };
   relatedTools: ToolFull[];
}

// Blog types
export interface BlogBasic {
   id: string;
   title: string;
   slug: string;
   excerpt: string;
   image: string;
   date: string;
   readTime: string;
   category: string;
   author: any;
   tags: string[];
}

export interface BlogFull {
   id: string;
   title: string;
   slug: string;
   content: string;
   excerpt: string | null;
   coverImage: string | null;
   createdAt: Date;
   updatedAt: Date;
   readingTime: number;
   viewCount: number;
   commentCount: number;
   author: {
      name: string;
      image: string;
      bio?: string;
      role?: string;
   };
   categories: {
      id: string;
      name: string;
      slug: string;
   }[];
   tags: {
      id: string;
      name: string;
      slug: string;
   }[];
   comments: BlogComment[];
}

export interface BlogComment {
   id: string;
   content: string;
   createdAt: Date;
   user: {
      id: string;
      name: string | null;
      image: string | null;
   };
}

export interface BlogDetailResponse {
   post: BlogFull;
   relatedPosts: BlogBasic[];
}

// Category types
export interface Category {
   id: string;
   name: string;
   slug: string;
   description: string | null;
   icon: string | null;
   createdAt: Date;
   updatedAt: Date;
   _count?: {
      tools?: number;
      blogs?: number;
   };
}

// Tag types
export interface Tag {
   id: string;
   name: string;
   slug: string;
   createdAt: Date;
   updatedAt: Date;
   _count?: {
      tools?: number;
      blogs?: number;
   };
}

// Company types
export interface Company {
   id: string;
   name: string;
   description: string | null;
   website: string | null;
   logo: string | null;
   userId: string;
   verified: boolean;
   createdAt: Date;
   updatedAt: Date;
}

// Plan types
export interface Plan {
   id: string;
   name: string;
   description: string;
   price: number;
   interval: string;
   features: any[];
   isPopular: boolean;
   isCurrent: boolean;
}

// Server action return types
export type GetFeaturedToolsResponse = ToolBasic[];
export type GetPopularCategoriesResponse = Category[];
export type GetFeaturedBlogPostsResponse = BlogBasic[];
export type GetAllToolsResponse = ToolFull[];
export type GetAllCategoriesResponse = Category[];
export type GetToolDetailResponse = ToolDetailResponse | null;
export type GetAllBlogPostsResponse = BlogBasic[];
export type GetFeaturedBlogPostsForSliderResponse = BlogBasic[];
export type GetBlogCategoriesResponse = Category[];
export type GetBlogTagsResponse = Tag[];
export type GetBlogPostDetailResponse = BlogDetailResponse | null;
export type GetPricingPlansResponse = Plan[];

// Update the ratingDistribution type to be a Record
export interface RatingDistribution {
   '1': number;
   '2': number;
   '3': number;
   '4': number;
   '5': number;
   [key: string]: number;
}
