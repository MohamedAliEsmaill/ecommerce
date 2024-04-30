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

@Component({
  selector: 'app-products-overview',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, LoadingSpinnerComponent, MatDialogModule, MatInputModule,
    MatButtonModule,
    MatFormFieldModule, MatIconModule],
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

  constructor(private pService: ProductService, public dialog: MatDialog) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      panelClass: 'mat-dialog-container-large',
      data: this.create
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('create dialog closed');

      this.loadProducts();
    })
  }

  openEditDialog(product: any) {
    this.loadProducts();

    const editDialog = this.dialog.open(ProductEditFormComponent, {
      panelClass: 'mat-dialog-container-large',
      data: { product }
    })

    editDialog.afterClosed().subscribe(result => {
      this.loadProducts();
    })
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.pService.getAllProducts(this.currentPage + 1, this.pageSize).subscribe({
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
        this.displayedProducts = this.displayedProducts.filter(prod => prod._id != id);
      },
      error: (error) => console.log(error)
    })
    this.loadProducts();
  }

  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
}
