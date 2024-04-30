import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './product-form.component.html',
  styles: ``
})
export class ProductFormComponent {

  selectedFiles: File[] = [];
  formData: any;
  isLoading = false;

  constructor(private productService: ProductService, public dialog: MatDialog) {

    this.formData = new FormData();

  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    desc: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]), // Ensure only numbers
    images: new FormControl([], [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    size: new FormControl([]),
    colors: new FormControl([]),
  });

  onFileChange(event: any) {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);
    this.selectedFiles.forEach((file, index) => {
      console.log(file);
      this.formData.append('images', file);
    });
  }

  // uploadFiles() {
  //   // Append each selected file to the FormData object
  //   this.selectedFiles.forEach((file, index) => {
  //     this.formData.append('images', file);
  //   });
  //   // formData.append(`productId`, '');
  // }


  onSubmit() {
    this.isLoading = true;
    let product = { ...this.productForm.value };
    let productId = '';
    this.productService.createProduct(product).subscribe({
      next: (data: any) => {
        productId = data.product._id;
        console.log(productId);
        this.formData.append(`productId`, productId);
        this.productService.uploadProductImage(this.formData).subscribe({
          next: res => {
            this.isLoading = false;
            this.dialog.closeAll();
          },
          error: error => console.log(error)
        })

      },
      error: error => console.error(error)
    });
  }
}
