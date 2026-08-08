export interface PlanPrice {
  type: string;
  price: number;
  priceId?: string;
  productId?: string;
  _id?: string;
}

export interface Plan {
  _id: string;
  title: string;
  planPrices: PlanPrice[];
  benefits: string[];
  participantCount: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageBody {
  title: 'free' | 'basic' | 'premium';
  type: 'month' | 'year' | 'free';
  planType: 'free' | 'paid';
  price: number;
  productId: string;
  platform: 'apple' | 'google';
  benefits: string[];
  participantCount: number;
}

export const initialPlans: Plan[] = [];