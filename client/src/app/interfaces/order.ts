export interface Order {
  products: string[];
  address: {
    street: string;
    city: string;
    zip: string;
  };
  totalPrice: number;
  date: Date;
  _id: string;
  user: string;
  status: 'pending' | 'accepted' | 'rejected';
  uniqueProductIds: string[];
  uniqueProducts: any[];
}
