import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';


@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-dialog.component.html',
  styles: ``
})
export class ProductDialogComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(ProductFormComponent);
  }

}
