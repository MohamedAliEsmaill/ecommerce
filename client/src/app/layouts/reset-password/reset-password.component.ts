import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [UserServiceService],
  // styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.password;
      const passwordConfirm = this.resetPasswordForm.value.passwordConfirm;

      if (newPassword !== passwordConfirm) {
        console.log('Passwords do not match');
        return;
      }

      const resetToken = localStorage.getItem('resetToken');
      if (!resetToken) {
        console.log('Reset token not found');
        return;
      }

      this.userService.resetPassword(newPassword, resetToken).subscribe({
        next: (response) => {
          console.log('Password reset successful:', response);
          localStorage.removeItem('resetToken');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Password reset failed:', error);
          // Handle error (e.g., display error message)
        },
      });
    }
  }
}
