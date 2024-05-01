import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { UserServiceService } from '../../services/user/user-service.service';
import Swal from 'sweetalert2';
import { recommendation } from '../../Utils/products'
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  providers: [ProductService, UserServiceService],
  templateUrl: './product-overview.component.html',
  styles: ``
})

export class ProductOverviewComponent {

  id: any;
  product: Product | undefined;
  primaryImage = '';
  availability = '';
  stock = 0;
  recommendationProduct = recommendation;
  isLoading = true;
  sizes = new Set<string>();
  colors = new Set<string>();
  wishListBtn = false;

  constructor(myRoute: ActivatedRoute, private productService: ProductService, private userService: UserServiceService, private localStorage: LocalStorageService) {
    this.id = myRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe({
      next: (data) => {
        this.product = data;
        this.stock = data.stock;
        this.isLoading = false;

        const products: any = this.localStorage.getItem('wishList');
        if (this.product) {
          if (products && products.some((prod: any) => prod._id === this.product?._id)) {
            this.wishListBtn = true;
          }
        }
      },
      error: (error) => console.error(error)
    })

  }

  activeImage(image: string) {
    this.primaryImage = image;
  }

  checkAvailability(): boolean {
    if (this.stock > 0) {
      return true;
    }
    return false;
  }

  addToCart() {
    if (!this.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is no enough quantity in the stock!',
      });
      return;
    }
    this.userService.addCart(this.id).subscribe({
      next: (data) => { },
      error: (error) => console.error(error)
    });
    Swal.fire({
      icon: 'success',
      title: 'Great!',
      text: 'Product Added To Your Cart Successfully'
    })
  }

  getColorFilters(colorVal: string) {
    if (this.colors.has(colorVal)) {
      this.colors.delete(colorVal);
    } else {
      this.colors.add(colorVal);
    }
  }

  getSizeFilters(sizeVal: string) {
    if (this.sizes.has(sizeVal)) {
      this.sizes.delete(sizeVal);
    } else {
      this.sizes.add(sizeVal);
    }
  }

  addProductToWishList() {
    let products: any;
    if (this.localStorage.getItem('wishList')) {
      products = this.localStorage.getItem('wishList');
      if (products.some((prod: any) => prod._id === this.product?._id)) {
        products = products.filter((prod: any) => prod._id !== this.product?._id);
      } else {
        products.push(this.product)
      }
      this.localStorage.setItem('wishList', products);
    } else {
      products = [];
      products.push(this.product);
      this.localStorage.setItem('wishList', products);
    }
  }

}
