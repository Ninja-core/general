import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutCustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  landmark?: string;
  notes?: string;
  paymentMethod: 'cod' | 'upi';
}
