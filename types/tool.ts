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
   features: any;
   performance: {
      userSatisfaction: number;
      reliability: number;
      speedScore: number;
      supportQuality: number;
      valueForMoney: number;
   };
   featured: boolean;
}
