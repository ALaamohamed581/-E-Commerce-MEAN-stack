import { Product } from '@bluebits/products';
export interface OrderItem {
  product?: Product;
  quantity: number;
}
