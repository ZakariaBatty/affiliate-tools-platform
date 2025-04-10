import { z } from 'zod';

export const toolSchema = z.object({
   name: z.string().min(2, 'Name must be at least 2 characters'),
   description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
   longDescription: z
      .string()
      .min(30, 'Description must be at least 30 characters'),
   logo: z.string().url().optional().nullable(),
   imageUrl: z.string().url().optional().nullable(),
   website: z.string().url(),
   verified: z.boolean(),
   featured: z.boolean(),
   categories: z.array(z.string()).min(1),
   pricing: z.object({
      free: z.boolean(),
      freeTrial: z.boolean(),
      pricingModel: z.string(),
      startingPrice: z.string(),
   }),
   features: z.array(z.string()).min(1),
   companyId: z.string().optional().nullable(),
   tags: z.array(z.string()).optional(),
});
