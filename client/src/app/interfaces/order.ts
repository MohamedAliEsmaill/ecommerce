import { Product } from './product';

export interface Order {
  products: string[];
  address: {
    street: string;
    city: string;
    zip: string;
  };
  totalPrice: number;
}
