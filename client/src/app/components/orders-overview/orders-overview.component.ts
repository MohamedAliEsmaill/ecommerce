import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-orders-overview',
  standalone: true,
  imports: [CommonModule],
  providers: [OrderService],
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.css',
})
export class OrdersOverviewComponent implements OnInit {
  allOrders: Order[] = []; // Ensure allOrders is initialized as an array
  displayedOrders: Order[] = [];
  currentPage = 0;
  pageSize = 5;
  visible = false;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response: {
        orders: Order[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalOrders: number;
        };
      }) => {
        // Ensure the response type is Order[]
        this.allOrders = response.orders;
        this.updateDisplayedProducts();
        console.log(response.orders);
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle error
      },
    });
  }
  updateDisplayedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedOrders = this.allOrders.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.allOrders.length) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }
}
