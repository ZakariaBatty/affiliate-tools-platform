// User types
export interface User {
   id: string;
   name: string;
   email: string;
   image?: string;
   role: 'USER' | 'COMPANY' | 'ADMIN';
   createdAt: string;
   updatedAt: string;
}

// Tool types
export interface Tool {
   id: string;
   name: string;
   slug: string;
   description: string;
   imageUrl?: string;
   websiteUrl?: string;
   companyId?: string;
   featured: boolean;
   popular: boolean;
   createdAt: string;
   updatedAt: string;
   categories: CategoryTool[];
   company?: Company;
   _count?: {
      views: number;
      savedBy: number;
   };
}

export interface Category {
   id: string;
   name: string;
   slug: string;
   description?: string;
   imageUrl?: string;
   createdAt: string;
   updatedAt: string;
}

export interface CategoryTool {
   toolId: string;
   categoryId: string;
   createdAt: string;
   category: Category;
}

export interface SavedTool {
   userId: string;
   toolId: string;
   createdAt: string;
   tool: Tool;
}

export interface ToolView {
   id: string;
   userId?: string;
   toolId: string;
   createdAt: string;
   tool: Tool;
}

export interface Comparison {
   id: string;
   userId?: string;
   createdAt: string;
   tools: Tool[];
}

// Blog types
export interface Blog {
   id: string;
   title: string;
   slug: string;
   excerpt?: string;
   content: string;
   imageUrl?: string;
   published: boolean;
   authorId?: string;
   createdAt: string;
   updatedAt: string;
   author?: User;
   categories: BlogCategory[];
   tags: BlogTag[];
   _count?: {
      views: number;
   };
}

export interface BlogCategory {
   blogId: string;
   categoryId: string;
   createdAt: string;
   category: Category;
}

export interface Tag {
   id: string;
   name: string;
   slug: string;
   createdAt: string;
   updatedAt: string;
}

export interface BlogTag {
   blogId: string;
   tagId: string;
   createdAt: string;
   tag: Tag;
}

export interface BlogView {
   id: string;
   userId?: string;
   blogId: string;
   createdAt: string;
   blog: Blog;
}

// Company types
export interface Company {
   id: string;
   name: string;
   slug: string;
   description?: string;
   logoUrl?: string;
   websiteUrl?: string;
   ownerId: string;
   createdAt: string;
   updatedAt: string;
   _count?: {
      tools: number;
   };
}

export interface Plan {
   id: string;
   name: string;
   description?: string;
   price: number;
   interval: string;
   features: string[];
   companyId: string;
   createdAt: string;
   updatedAt: string;
}

export interface Payment {
   id: string;
   amount: number;
   status: string;
   userId: string;
   companyId: string;
   planId: string;
   createdAt: string;
   updatedAt: string;
}

// Activity type
export interface Activity {
   id: string;
   userId: string;
   action: string;
   toolId?: string;
   blogId?: string;
   comparisonId?: string;
   metadata?: any;
   createdAt: string;
   tool?: Tool;
   blog?: Blog;
   comparison?: Comparison;
}
