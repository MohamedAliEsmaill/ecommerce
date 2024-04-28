import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  providers: [ProfileService, RouterModule, RouterOutlet],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  userInfo: any = {};
  constructor(public profileService: ProfileService, private router: Router) {
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
  editProfile() {
    this.router.navigate(['edit']);
  }
}
