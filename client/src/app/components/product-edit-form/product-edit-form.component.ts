import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './product-edit-form.component.html',
  styles: ``
})
export class ProductEditFormComponent {

  product: any = {};
  imagesUrl: any;
  selectedFiles: File[] = [];
  isLoading = false;

  constructor(private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    let { name, price, images, desc, stock, brand, category, size, colors } = this.data.product;
    this.product = this.data.product;
    this.productForm.setValue({ name, price, desc, stock, images, brand, category, size, colors })
    this.imagesUrl = images;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productService.getProductById(this.product._id).subscribe({
      next: response => {
        this.product = response;
        this.imagesUrl = response.images;
      },
    })
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    desc: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]), // Ensure only numbers
    images: new FormControl([]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    size: new FormControl([]),
    colors: new FormControl([]),
  });

  removeImage(image: any) {
    this.imagesUrl = this.imagesUrl.filter((img: any) => img != image);
    this.productForm.value.images = this.imagesUrl;
    console.log(this.productForm.value.images);
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  uploadFiles() {
    this.isLoading = true;
    const formData = new FormData();

    // Append each selected file to the FormData object
    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });
    formData.append(`productId`, this.product._id);

    // Send the FormData to the server using HttpClient
    this.productService.uploadProductImage(formData).subscribe({
      next: res => {
        this.dialog.closeAll();
        this.isLoading = false;
      },
      error: error => console.log(error)

    })
  }

}
