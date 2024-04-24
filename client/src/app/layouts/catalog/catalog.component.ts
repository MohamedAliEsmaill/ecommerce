import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  providers: [ProductService],
  styles: ``
})
export class CatalogComponent {

  constructor(private productService: ProductService) { }

  products: Product[] | undefined;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data.products);
        this.products = data.products;
      },
      error: (error) => {
        console.error("404 Not Found");
      }
    })
  }

}
