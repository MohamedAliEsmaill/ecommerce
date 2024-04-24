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

  products: Product[] = [];
  checksCategory: string[] = [];
  checksBrand: string[] = [];
  filteredProducts: Product[] = [];

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

  getCategoriesFilters(inputValue: any) {
    const inputVal = inputValue.target.value;
    if (!inputValue.target.checked) {
      this.checksCategory.splice(this.checksCategory.indexOf(inputVal, 1));
    } else {
      this.checksCategory.push(inputVal)
    }
    this.filter();
    console.log(this.checksCategory);
  }

  filter() {
    if (this.checksCategory.length)
      this.filteredProducts = this.products.filter((prod) => this.checksCategory.includes(prod.category));

    if (this.checksBrand.length)
      this.filteredProducts = this.filteredProducts.filter((prod) => this.checksBrand.includes(prod.brand));

    console.log(this.filteredProducts);
  }

  getBrandsFilters(inputValue: any) {
    const inputVal = inputValue.target.value;
    if (!inputValue.target.checked) {
      this.checksBrand.splice(this.checksBrand.indexOf(inputVal, 1));
    } else {
      this.checksBrand.push(inputVal)
    }
    this.filter();
    console.log(this.checksBrand);
  }



}
