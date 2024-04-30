import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductEditFormComponent } from '../product-edit-form/product-edit-form.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-products-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    LoadingSpinnerComponent,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.css',
})
export class ProductsOverviewComponent {
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  currentPage = 0;
  pageSize = 10;
  isLoading = true;
  create = true;
  searchForm: FormGroup;
  searchValue = '';
  searchResults: string[] = [];
  proudctFilter: Product[] = [];
  products: Product[] = [];

  constructor(
    private pService: ProductService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  openDialog() {
    this.dialog.open(ProductFormComponent, {
      panelClass: 'mat-dialog-container-large',
      data: this.create,
    });
  }

  openEditDialog(product: any) {
    this.dialog.open(ProductEditFormComponent, {
      panelClass: 'mat-dialog-container-large',
      data: { product },
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.pService
      .getAllProducts(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.allProducts = response.totalProducts;
          this.displayedProducts = response.products;
        },
        error: (error) => {
          console.log('Error:', error);
          // Handle error
        },
      });
    this.isLoading = false;
  }

  deleteProduct(id: any) {
    this.pService.deleteProduct(id).subscribe({
      next: (data: any) => {
        this.displayedProducts = this.displayedProducts.filter(
          (prod) => prod._id != id
        );
      },
      error: (error) => console.log(error),
    });
  }

  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  // part of search
  search() {
    if (this.searchForm.valid) {
      this.searchValue = this.searchForm.value.search;
      this.pService.getAllProducts().subscribe({
        next: (data: any) => {
          this.products = data.products;
          this.proudctFilter = this.filterProducts(this.searchValue);
          this.displayedProducts = this.proudctFilter;
        },
        error: (error) => {
          console.error('404 Not Found');
        },
      });
    } else this.loadProducts();
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
