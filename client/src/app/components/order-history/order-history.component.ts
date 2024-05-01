import { OrderService } from './../../services/order/order.service';
import { Component } from '@angular/core';
import { Order } from '../../interfaces/order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserServiceService } from '../../services/user/user-service.service';
import { ProfileService } from '../../services/profile/profile.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
  providers: [OrderService],
})
export class OrderHistoryComponent {
  orders: Order[] = [
    {
      _id: '',
      user: '',
      products: [],
      totalPrice: 0,
      status: 'pending',
      date: new Date(),
      address: {
        street: '',
        city: '',
        zip: '',
      },
      uniqueProductIds: [],
      uniqueProducts: [],
    },
  ];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
  } = {
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
  };
  selectedOrder: any = {};
  userInfo: any = {};
  isLoading = true;

  ngOnInit(): void {
    this.order.getOrders(this.pagination.currentPage, 5).subscribe({
      next: (orders) => {
        console.log(orders);

        this.orders = orders.orders;
        this.pagination = orders.pagination;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.profileService.getProfile().subscribe({
      next: (data: any) => {
        if (
          !data.image.includes(
            'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
          )
        )
          data.image = 'data:image/png;base64,' + data.image;

        this.userInfo = data;
      },
      error: (error) => console.error(error),
    });
  }

  getOrders() {
    this.order.getOrders(this.pagination.currentPage, 5).subscribe({
      next: (orders) => {
        this.orders = orders.orders;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  nextPage() {
    if (this.pagination.currentPage < this.pagination.totalPages) {
      console.log(`Current page: ${this.pagination.currentPage}`);

      this.pagination.currentPage++;
      this.getOrders();
    }
  }

  prevPage() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.getOrders();
    }
  }

  constructor(
    private order: OrderService,
    private profileService: ProfileService
  ) {}
}
