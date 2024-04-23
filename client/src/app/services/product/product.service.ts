import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.API_URL);
  }

  getProductById(id: string) {

  }

  createProduct() {

  }

  updateProduct() {

  }

  deleteProduct() {

  }

}
