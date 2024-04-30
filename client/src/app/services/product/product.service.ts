import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(page: number = 1, limit: number = 10) {
    return this.http.get<Product[]>(
      `${this.API_URL}?page=${page}&limit=${limit}`
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(this.API_URL, product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  decreaseStock(products: { id: string; count: number }[]) {
    return this.http.post(`${this.API_URL}/decrease-stock`, { products });
  }

  uploadProductImage(data: FormData) {
    console.log(data);
    return this.http.patch(`${this.API_URL}/updateImage`, data);
  }

  getChartsProducts() {
    return this.http.get(`${this.API_URL}/product-counts-by-brand`);
  }
}
