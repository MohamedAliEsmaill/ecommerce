import { Component } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    RouterModule,
    AddressComponent,
    DeliveryComponent,
    PaymentComponent,
    ReviewComponent,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  data = 'Hello World!';
  constructor() {}
}
