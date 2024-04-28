import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ProfileService],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;

    if (newPassword !== confirmNewPassword) {
      form.get('confirmNewPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmNewPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      this.profileService.updatePassword(formData).subscribe({
        next: (response) => {
          console.log('Password updated successfully:', response);
          this.router.navigate(['/profile']);
          // Optionally, you can reset the form or show a success message
        },
        error: (error) => {
          console.error('Error updating password:', error);
          if (error.error.error === 'Incorrect current password') {
            this.errorMessage = 'Incorrect current password';
          } else {
            this.errorMessage = 'Error updating password';
          }
        },
      });
    }
  }
}
