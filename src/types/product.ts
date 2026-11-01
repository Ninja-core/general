export type ProductCategory = 
  | 'Rice & Grains'
  | 'Pulses & Dals'
  | 'Atta & Flour'
  | 'Spices & Masalas'
  | 'Cooking Oils'
  | 'Tea & Coffee'
  | 'Snacks & Biscuits'
  | 'Household Essentials'
  | 'Personal Care'
  | 'Dairy Products'
  | 'Beverages';

export interface Product {
  id: string;
  name: string;
  brand: string;
  quantity: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountBadge?: string; // e.g. "Bestseller", "8% off", "Deal"
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  description: string;
  origin?: string;
  shelfLife?: string;
  isPopular?: boolean;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  shortName: string;
  tagline: string;
  image: string;
  itemCount: number;
}

