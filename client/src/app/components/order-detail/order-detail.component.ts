import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, SidebarComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  providers: [OrderService],
})
export class OrderDetailComponent {
  selectedOrder: any = {};
  products: any = [];
  orderId: any;
  userInfo: any = {};
  isLoading = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private order: OrderService,
    private profileService: ProfileService
  ) {
    this.orderId = this.route.snapshot.params['id'];
    console.log(this.orderId);
  }

  ngOnInit(): void {
    this.order.getOrderById(this.orderId).subscribe({
      next: (order) => {
        this.selectedOrder = order.order;
        this.products = order.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.profileService.getProfile().subscribe({
      next: data => {
        this.userInfo = data;
      },
      error: error => console.error(error)
    })
  }

  cancelOrder(id: string) {
    this.order.deleteOrder(this.orderId).subscribe({
      next: () => {
        console.log('Order deleted successfully');
        this.router.navigate(['/order-history']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
