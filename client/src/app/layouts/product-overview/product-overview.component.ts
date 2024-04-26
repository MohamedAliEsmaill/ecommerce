import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { UserServiceService } from '../../services/user/user-service.service';
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [],
  providers: [ProductService, UserServiceService, ToastModule],
  templateUrl: './product-overview.component.html',
  styles: ``
})

export class ProductOverviewComponent {

  id: any;
  product: Product | undefined;
  primaryImage = '';
  availability = '';
  stock = 0;

  constructor(myRoute: ActivatedRoute, private productService: ProductService, private userService: UserServiceService) {
    this.id = myRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data;
        this.stock = data.stock;
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
    console.log(this.id);
    this.userService.addCart(this.id).subscribe({
      next: (data) => { },
      error: (error) => console.error(error)
    });
  }

}
