import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Item {
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  totalPrice: number = 0;
  fakeItems: Item[] = [
    {
      name: 'Apple Watch',
      image: 'https://tailwind-ecommerce-demo.vercel.app/bedroom.ff2259bc.png',
      price: 599,
      quantity: 1,
      total: 599,
    },
    {
      name: 'Samsung Galaxy Watch',
      image: 'https://tailwind-ecommerce-demo.vercel.app/bedroom.ff2259bc.png',
      price: 399,
      quantity: 1,
      total: 399,
    },
    {
      name: 'Fitbit Charge',
      image: 'https://tailwind-ecommerce-demo.vercel.app/bedroom.ff2259bc.png',
      price: 199,
      quantity: 1,
      total: 199,
    },
  ];

  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
    this.calculateTotalPrice();
  }
  constructor() {
    // Calculate the total price when the component is initialized
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.fakeItems.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.calculateTotalPrice();
  }

  removeItem(item: any) {
    const index = this.fakeItems.indexOf(item);
    if (index > -1) {
      this.fakeItems.splice(index, 1);
    }
    this.calculateTotalPrice();
  }
}
