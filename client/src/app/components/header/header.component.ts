import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';
ProductService;
@Component({
  selector: 'app-header',
  standalone: true,
  providers: [ProductService],
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  toggleBurgerMenu = false;
  searchForm: FormGroup;
  searchValue = '';
  searchResults: string[] = [];
  proudctFilter: Product[] = [];
  products: Product[] = [];
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data.products);
        this.products = data.products;
      },
      error: (error) => {
        console.error('404 Not Found');
      },
    });
  }
  toggleMenu() {
    this.toggleBurgerMenu = !this.toggleBurgerMenu;
  }

  closeMenu() {
    this.toggleBurgerMenu = false;
  }

  search() {
    if (this.searchForm.valid) {
      this.searchValue = this.searchForm.value.search;
      this.proudctFilter = this.filterProducts(this.searchValue);
    } else this.proudctFilter = [];
  }
  emptySearch() {
    this.searchForm.reset();
    this.proudctFilter = [];
  }
  // Function to perform the search (replace with actual search logic)
  filterProducts(term: string): Product[] {
    return this.products.filter((result) =>
      result.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
