import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  @Output() cardNumber = new EventEmitter<string>();
  @Output() cardHolder = new EventEmitter<string>();
  @Output() expirationDate = new EventEmitter<string>();
  @Output() cvv = new EventEmitter<string>();

  setCardNumber(e: any) {
    this.cardNumber.emit(e.target.value);
  }

  setCardHolder(e: any) {
    this.cardHolder.emit(e.target.value);
  }

  setExpirationDate(e: any) {
    this.expirationDate.emit(e.target.value);
  }

  setCvv(e: any) {
    this.cvv.emit(e.target.value);
  }
}
