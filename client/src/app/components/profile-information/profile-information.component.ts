import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [SidebarComponent, LoadingSpinnerComponent],
  providers: [ProfileService],
  templateUrl: './profile-information.component.html',
})
export class ProfileInformationComponent {
  userInfo: any = {};
  isLoading = true;
  constructor(
    public profileService: ProfileService,
    public router: ActivatedRoute
  ) {
    this.router.url.subscribe((url) => {
      console.log(url);
    });
    this.profileService.getProfile().subscribe({
      next: (data: any) => {
        if (data.image) {
          data.image = 'data:image/png;base64,' + data.image;
        } else {
          data.image = 'https://cdn-icons-png.freepik.com/256/12225/12225773.png?semt=ais_hybrid';
        }
        console.log(data);
        this.userInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
