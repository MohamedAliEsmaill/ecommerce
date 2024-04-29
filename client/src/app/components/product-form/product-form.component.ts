import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styles: ``
})
export class ProductFormComponent {

  constructor(private productService: ProductService, public dialog: MatDialog) {
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    desc: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]), // Ensure only numbers
    image1: new FormControl('', [Validators.required]),
    image2: new FormControl(''),
    image3: new FormControl(''),
    image4: new FormControl(''),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    size: new FormControl([]),
    colors: new FormControl([]),
  });


  onSubmit() {
    let { image1, image2, image3, image4 } = this.productForm.value;
    let product = { ...this.productForm.value, images: [image1, image2, image3, image4] }
    this.productService.createProduct(product).subscribe({
      error: error => console.error(error)
    });
    this.dialog.closeAll();
  }
}
