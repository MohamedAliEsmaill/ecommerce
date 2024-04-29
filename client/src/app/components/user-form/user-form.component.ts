import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  protected user: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: any }) {
    this.user = data.user;
  }
}
