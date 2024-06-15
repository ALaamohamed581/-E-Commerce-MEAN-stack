import { Product } from '../../../products/src/lib/modals/ProductModel';
export interface OrderItem {
  product?: Product;
  quantity: number;
}
