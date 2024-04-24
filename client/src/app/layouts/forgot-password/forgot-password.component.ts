import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserServiceService } from '../../services/user/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  providers: [UserServiceService],
  // styleUrls: ``,
})
export class ForgotPasswordComponent {
  forgetpasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.forgetpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    console.log('Form submitted'); // Check if this log appears in the console
    if (this.forgetpasswordForm.valid) {
      const email = this.forgetpasswordForm.value;
      console.log('Email:', email); // Check if email value is correctly retrieved
      this.userService.forgetPassword(email).subscribe({
        next: (response) => {
          console.log('Password reset email sent:', response);
          localStorage.setItem('resetToken', response.resetToken);
          this.router.navigate(['/reset-password']);
        },
        error: (error) => {
          console.log('Password reset failed:', error);
        },
      });
    }
  }
}
