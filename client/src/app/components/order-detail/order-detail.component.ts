import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  providers: [OrderService],
})
export class OrderDetailComponent {
  selectedOrder: any = {};
  products: any = [];
  orderId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private order: OrderService
  ) {
    this.orderId = this.route.snapshot.params['id'];
    console.log(this.orderId);
  }

  ngOnInit(): void {
    this.order.getOrderById(this.orderId).subscribe({
      next: (order) => {
        this.selectedOrder = order.order;
        this.products = order.products;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cancelOrder(id: string) {
    this.order.deleteOrder(this.orderId).subscribe({
      next: () => {
        console.log('Order deleted successfully');
        this.router.navigate(['/profile/history']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
