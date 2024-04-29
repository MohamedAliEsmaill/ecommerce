import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import Swal from 'sweetalert2';
import { UserServiceService } from '../../services/user/user-service.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [LoadingSpinnerComponent, SidebarComponent],
  providers: [LocalStorageService],
  templateUrl: './wishlist.component.html',
  styles: ``
})
export class WishlistComponent {

  products: any;
  isLoading = true;
  userInfo: any = {};

  constructor(private localStorage: LocalStorageService, private userService: UserServiceService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.products = this.localStorage.getItem('wishList');
    console.log(this.products);
    this.profileService.getProfile().subscribe({
      next: (data: any) => {
        if (data.image) {
          data.image = 'data:image/png;base64,' + data.image;
        } else {
          data.image = 'https://cdn-icons-png.freepik.com/256/12225/12225773.png?semt=ais_hybrid';
        }
        this.userInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
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
