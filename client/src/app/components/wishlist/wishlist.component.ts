import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  providers: [LocalStorageService],
  templateUrl: './wishlist.component.html',
  styles: ``
})
export class WishlistComponent {

  products: any;
  isLoading = true;

  constructor(private localStorage: LocalStorageService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.products = this.localStorage.getItem('wishList');
    this.isLoading = false;
    console.log(this.products);
  }

  removeProduct(id: string) {
    this.products = this.products.filter((prod: any) => prod._id != id);
    this.localStorage.removeItem('wishList');
    this.localStorage.setItem('wishList', this.products);
  }

  addToCart(product: any) {
    console.log(product._id);
    if (!product.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is no enough quantity in the stock!',
      });
      return;
    }
    this.userService.addCart(product._id).subscribe({
      next: (data) => { },
      error: (error) => console.error(error)
    });
    Swal.fire({
      icon: 'success',
      title: 'Great!',
      text: 'Product Added To Your Cart Successfully'
    })
    this.removeProduct(product._id)
  }

}
