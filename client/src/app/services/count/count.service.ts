import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserServiceService } from '../user/user-service.service';
@Injectable({
  providedIn: 'root',
})
export class CountService {
  private product = new BehaviorSubject<number>(0);
  selectedProduct = this.product.asObservable();
  constructor(private userService: UserServiceService) {
    this.setProduct();
  }
  setProduct() {
    this.userService.getCartSize().subscribe((data) => {
      this.product.next(data.data);
    });
  }
}
