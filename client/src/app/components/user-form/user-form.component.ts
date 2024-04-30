import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { UserServiceService } from '../../services/user/user-service.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProfileService],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  protected user: any = {};
  userForm: FormGroup;
  fileToUpload: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    private dialogRef: MatDialogRef<UserFormComponent>,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      street1: ['', Validators.required],
      street2: [''],
      state: ['', Validators.required],
      image: [''],
    });
    this.user = data.user;
    console.log('User:', this.user.address[0]);
    this.userForm.setValue({
      fullName: this.user.fullName,
      email: this.user.email,
      username: this.user.username,
      phone: this.user.phone,
      country: this.user.address[0].country,
      city: this.user.address[0].city,
      zip: this.user.address[0].zip,
      street1: this.user.address[0].street1,
      street2: this.user.address[0].street2,
      state: this.user.address[0].state,
      image: '',
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUserData = {
        fullName: this.userForm.value.fullName,
        email: this.userForm.value.email,
        username: this.userForm.value.username,
        phone: this.userForm.value.phone,
        address: [
          {
            country: this.userForm.value.country,
            city: this.userForm.value.city,
            zip: this.userForm.value.zip,
            street1: this.userForm.value.street1,
            street2: this.userForm.value.street2,
            state: this.userForm.value.state,
          },
        ],
      };
      console.log('Updated user data:', updatedUserData);
      const formData = new FormData();
      // Append the file to the form data if a file was selected
      if (this.fileToUpload) {
        formData.append('image', this.fileToUpload);
      }

      console.log('updatedUserData', updatedUserData);
      this.profileService.adminUpdateProfile(updatedUserData).subscribe({
        next: (response) => {
          console.log('Admin Profile updated successfully:', response);
          this.dialogRef.close('success');
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
      this.profileService.updateImage(this.fileToUpload).subscribe({
        next: (response) => {
          console.log('Image updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating image:', error);
        },
      });
    } else {
      this.fileToUpload = null;
    }
  }
}
