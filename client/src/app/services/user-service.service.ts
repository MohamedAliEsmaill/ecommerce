import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Define the login method
  login(data: any): Observable<any> {
    debugger;
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  // Define the register method
  signup(data: any): Observable<any> {
    // debugger;
    return this.http.post(`${this.apiUrl}/signup`, data).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }

  addCart(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, data).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  getCart(): Observable<any> {
    debugger;
    return this.http.get(`${this.apiUrl}/cart`).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  deleteCart(data: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart`, data).pipe(
      // Handle any errors
      catchError(this.handleError)
    );
  }
  // Error handling function
  private handleError(error: HttpErrorResponse) {
    // Handle different types of errors
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    // Return an observable with an error message
    return throwError(
      'An error occurred while trying to signup/login. Please try again later.'
    );
  }
  public isAdmin(): Boolean {
    let userRole = localStorage.getItem('role');
    if (userRole == 'user') {
      return false;
    } else {
      return true;
    }
  }
  public isLoggedIn(): Boolean {
    let IsLoggedInUser = localStorage.getItem('token');
    if (IsLoggedInUser) {
      return true;
    } else {
      return false;
    }
  }
}
