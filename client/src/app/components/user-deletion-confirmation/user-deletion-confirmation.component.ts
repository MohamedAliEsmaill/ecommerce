import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-user-deletion-confirmation',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [ProfileService],
  templateUrl: './user-deletion-confirmation.component.html',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Return true if confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Return false if canceled
  }
}
