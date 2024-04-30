import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly API_URL: string = 'http://127.0.0.1:3000/api/profile';
  constructor(private http: HttpClient) {}

  getAllProfile() {
    return this.http.get(this.API_URL + '/all');
  }

  getProfile() {
    return this.http.get(this.API_URL + '/view');
  }

  updateProfile(data: any) {
    return this.http.patch(this.API_URL + '/edit', data);
  }

  adminUpdateProfile(data: any) {
    return this.http.patch(this.API_URL + '/admin/edit', data);
  }

  updatePassword(data: any) {
    return this.http.patch(this.API_URL + '/password', data);
  }
  updateImage(data: any) {
    const formData = new FormData();
    formData.append('image', data);
    return this.http.patch(this.API_URL + '/updateImage', formData);
  }
}
