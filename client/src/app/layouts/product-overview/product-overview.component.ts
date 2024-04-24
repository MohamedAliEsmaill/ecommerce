import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductService],
  templateUrl: './product-overview.component.html',
  styles: ``
})

export class ProductOverviewComponent {

  id: any;
  product: Product | undefined;
  primaryImage = '';
  availability = '';
  stock = 0;

  constructor(myRoute: ActivatedRoute, private productService: ProductService) {
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

}
