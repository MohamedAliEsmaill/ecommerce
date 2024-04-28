import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [],
  providers: [ProfileService],
  templateUrl: './profile-information.component.html',
})
export class ProfileInformationComponent {
  userInfo: any = {};
  constructor(
    public profileService: ProfileService,
    public router: ActivatedRoute
  ) {
    this.router.url.subscribe((url) => {
      console.log(url);
    });
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
}
