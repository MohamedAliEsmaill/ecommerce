import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user/user-service.service';
interface Item {
  _id: string;
  name: string;
  price: number;
  desc: string;
  stock: number;
  image: string;
  count: number;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  providers: [UserServiceService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  fakeItems: Item[] = [];

  constructor(private userService: UserServiceService) {
    this.userService.getCart().subscribe({
      next: (data) => {
        this.fakeItems = data.data;
        this.calculateTotalPrice();
      },
      error: (error) => console.error(error)
    })
  }
  ngOnInit(): void {
    this.calculateTotalPrice();
  }
  decreaseQuantity(item: any) {
    if (item.count > 1) {
      item.count--;
      const remove = {
        productId: item._id,
        type: 'remove'
      }
      this.userService.deleteCart(remove).subscribe({
        next: (data) => { },
        error: (error) => console.error(error)
      })
    }
    console.log(this.fakeItems);
    this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    this.totalPrice = this.fakeItems.reduce((sum, item) => {
      return sum + (item.count * item.price);
    }, 0);
  }

  increaseQuantity(item: any) {
    if (item.count >= item.stock) return;
    item.count++;
    this.userService.addCart(item._id).subscribe({
      next: (data) => { },
      error: (error) => console.error(error)
    })
    this.calculateTotalPrice();
  }

  removeItem(item: any) {
    const index = this.fakeItems.indexOf(item);
    if (index > -1) {
      this.fakeItems.splice(index, 1);
      const remove = {
        productId: item._id,
        type: 'removeAll'
      }
      this.userService.deleteCart(remove).subscribe({
        next: (data) => { },
        error: (error) => console.error(error)
      })
    }
    this.calculateTotalPrice();
  }
}
