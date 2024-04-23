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
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  providers: [UserServiceService],
  // styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // debugger;
      // // Call the login method in the auth service
      this.userService.login(formData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle successful login (e.g., redirect to another page)
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/about-us']);
          console.log(response.token);
        },
        error: (error) => {
          console.log('Login failed:', error);
          // Handle login failure (e.g., display an error message)
        },
      });
      // this.userService.getCart().subscribe({
      //   next: (response) => {
      //     console.log('Login successful:', response);
      //     // Handle successful login (e.g., redirect to another page)

      //     // localStorage.setItem('token', response.token);
      //     // console.log(response.token);
      //   },
      //   error: (error) => {
      //     console.log('Login failed:', error);
      //     // Handle login failure (e.g., display an error message)
      //   },
      // });
    }
  }
}
