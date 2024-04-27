import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, LoadingSpinnerComponent],
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
  minPrice = 0;
  maxPrice = 0;
  sizes = new Set<string>();
  colors = new Set<string>();
  sortToggle = false;
  isLoading = true;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.filteredProducts = this.products;
        this.isLoading = false;
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
  }

  getBrandsFilters(inputValue: any) {
    const inputVal = inputValue.target.value;
    if (!inputValue.target.checked) {
      this.checksBrand.splice(this.checksBrand.indexOf(inputVal, 1));
    } else {
      this.checksBrand.push(inputVal)
    }
    this.filter();
  }

  getMinPriceFilter(priceInput: any) {
    this.minPrice = priceInput.target.value;
    this.filter();
  }

  getMaxPriceFilter(priceInput: any) {
    const maxVal = priceInput.target.value;
    if (maxVal > this.minPrice)
      this.maxPrice = maxVal;
    this.filter();
  }

  getSizeFilters(sizeVal: string) {
    if (this.sizes.has(sizeVal)) {
      this.sizes.delete(sizeVal);
    } else {
      this.sizes.add(sizeVal);
    }
    this.filter();
  }

  getColorFilters(colorVal: string) {
    if (this.colors.has(colorVal)) {
      this.colors.delete(colorVal);
    } else {
      this.colors.add(colorVal);
    }
    this.filter();
  }

  getSort(sortVal: string) {
    if (sortVal === "Asc") {
      this.filteredProducts = this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.filteredProducts = this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.sortToggle = false;
  }


  filter() {
    if (!this.checksCategory.length && !this.checksBrand.length && !this.maxPrice && !this.minPrice && !this.sizes && !this.colors) {
      this.filteredProducts = this.products; // Reset to all products
    }
    else {
      this.filteredProducts = this.products.filter(prod => {
        return (
          (!this.checksCategory.length || this.checksCategory.includes(prod.category)) &&
          (!this.checksBrand.length || this.checksBrand.includes(prod.brand)) &&
          (!this.minPrice || prod.price >= this.minPrice) &&
          (!this.maxPrice || prod.price <= this.maxPrice) &&
          (!this.sizes.size || prod.size.some(size => this.sizes.has(size))) &&
          (!this.colors.size || prod.colors.some(color => this.colors.has(color)))
        );
      });
    }
  }

}
