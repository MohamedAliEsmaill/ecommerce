import { Component, OnInit } from '@angular/core';
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
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-manage-address',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SidebarComponent,
    LoadingSpinnerComponent,
  ],
  providers: [ProfileService],
  templateUrl: './manage-address.component.html',
})
export class ManageAddressComponent implements OnInit {
  addressForm: FormGroup;
  address: any = {};
  userInfo: any = {};
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.addressForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      street1: ['', Validators.required],
      street2: [''],
      state: ['', Validators.required],
    });

    // Fetch the current user's profile
    this.profileService.getProfile().subscribe({
      next: (data: any) => {
        console.log(data);
        this.address = data;
        // Populate the form with the user's address data
        if (this.address.address && this.address.address.length > 0) {
          const address = this.address.address[0];
          this.addressForm.patchValue({
            country: address.country,
            city: address.city,
            zip: address.zip,
            street1: address.street1,
            street2: address.street2,
            state: address.state,
          });
        }
        if (
          !data.image.includes(
            'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
          )
        )
          data.image = 'data:image/png;base64,' + data.image;

        this.userInfo = data;
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const updatedAddress = {
        address: this.addressForm.value,
      };
      // Send the updated address to the server
      this.profileService.updateProfile(updatedAddress).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
