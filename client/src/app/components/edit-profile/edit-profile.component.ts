import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ProfileService],
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  userForm: FormGroup;
  fileToUpload: File | null = null;
  userInfo: any = {};

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({});
    this.profileService.getProfile().subscribe({
      next: (data) => {
        console.log(data);
        this.userInfo = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      image: [''],
    });

    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUserData = this.userForm.value;
      console.log('Updated user data:', updatedUserData);
      const formData = new FormData();

      // Append the updated user data to the form data
      for (const key in updatedUserData) {
        formData.append(key, updatedUserData[key]);
      }

      // Append the file to the form data if a file was selected
      if (this.fileToUpload) {
        formData.append('image', this.fileToUpload);
      }
      console.log(formData);
      this.profileService.updateProfile(updatedUserData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        },
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files[0];
    } else {
      this.fileToUpload = null;
    }
  }
}
