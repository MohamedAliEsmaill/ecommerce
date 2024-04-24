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
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styles: ``,
  providers: [UserServiceService],
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      // debugger;
      // // Call the Register method in the auth service
      this.userService.signup(formData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          // Handle successful Register
          // localStorage.setItem('RegisterUserData', response.fullName);
          // localStorage.setItem('RegisterUserEmail', response.email);
          // localStorage.setItem('RegisterUserPhone', response.phone);
          // localStorage.setItem('RegisterUserUsername', response.username);
          // localStorage.setItem('role', response.role);
          // localStorage.setItem('SignUptoken', response.token);
          // console.log(response);
          this.router.navigate(['/login']);
          // console.log(response.token);
        },
        error: (error) => {
          console.log('signup failed:', error);
          // Handle signup failure (e.g., display an error message)
        },
      });
    }
  }
}
