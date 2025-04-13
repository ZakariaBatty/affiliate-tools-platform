// Form submission types
export interface ToolRatingFormData {
   rating: number;
   review?: string;
}

export interface ToolCommentFormData {
   content: string;
   parentId?: string;
}

export interface BlogCommentFormData {
   content: string;
   parentId?: string;
}

export interface SaveToolFormData {
   toolId: string;
}

export interface ComparisonFormData {
   title?: string;
   toolIds: string[];
   notes?: Record<string, string>;
}

export interface SubscriptionFormData {
   planId: string;
   paymentMethod: string;
}

export interface ContactFormData {
   name: string;
   email: string;
   subject: string;
   message: string;
}

export interface UserProfileFormData {
   name: string;
   email: string;
   image?: string;
   password?: string;
   currentPassword?: string;
}

export interface CompanyProfileFormData {
   name: string;
   description?: string;
   website?: string;
   logo?: string;
}

export interface ToolFormData {
   name: string;
   description: string;
   longDescription: string;
   logo?: string | null;
   imageUrl?: string | null;
   website: string;
   verified?: boolean;
   featured?: boolean;
   categories: string[];
   pricing?: {
      free: boolean;
      freeTrial: boolean;
      pricingModel: string;
      startingPrice: string;
   };
   features?: string[] | null;
   companyId?: string | null;
   tags?: string[];
}
