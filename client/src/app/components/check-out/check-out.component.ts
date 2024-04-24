import { Component } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    CommonModule,
    AddressComponent,
    DeliveryComponent,
    PaymentComponent,
    ReviewComponent,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  currentStep = 1;
  order: Order;

  constructor() {
    this.order = {
      products: [],
      totalPrice: 0,
    };
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setProducts(products: string[]) {
    this.order.products = products;
  }

  setTotalPrice(totalPrice: number) {
    this.order.totalPrice = totalPrice;
  }
}
