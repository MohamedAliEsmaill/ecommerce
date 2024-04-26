import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    return this.http.post<any>(this.API_URL, order);
  }

  getOrders(
    page: number | undefined = undefined,
    pageSize: number | undefined = undefined
  ) {
    const params = new HttpParams()
      .set('page', page ? page.toString() : '')
      .set('limit', pageSize ? pageSize.toString() : '');

    return this.http.get<{
      orders: Order[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalOrders: number;
      };
    }>(this.API_URL, { params });
  }

  getOrderById(id: string) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  deleteOrder(id: string) {
    return this.http.delete<any>(`${this.API_URL}/${id}/cancel`);
  }

  updateOrderStatus(id: string, status: 'accept' | 'reject') {
    return this.http.put<any>(`${this.API_URL}/${id}/${status}`, {});
  }
}
