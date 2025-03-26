export interface Tool {
   id: number;
   name: string;
   description: string;
   category: string;
   image: string;
   rating: number;
   price: {
      monthly: number;
      yearly: number;
      hasFree: boolean;
   };
   features: Record<string, boolean>;
   performance: Record<string, number>;
   featured: boolean;
}
