import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-overview',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService],
  templateUrl: './products-overview.component.html',
  styleUrl: './products-overview.component.css',
})
export class ProductsOverviewComponent implements OnInit {
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  currentPage = 0;
  pageSize = 5;
  visible = false;

  constructor(private pService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.pService.getAllProducts().subscribe({
      next: (response: any) => {
        this.allProducts = response.products;
        this.updateDisplayedProducts();
      },
      error: (error) => {
        console.log('Error:', error);
        // Handle error
      },
    });
  }

  updateDisplayedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.displayedProducts = this.allProducts.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.allProducts.length) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }
}
