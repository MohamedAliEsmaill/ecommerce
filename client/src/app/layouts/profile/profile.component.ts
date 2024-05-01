import { routes } from './../../app.routes';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AccountComponent } from '../account/account.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    AccountComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
  ],
  providers: [ProfileService],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userInfo: any = {};
  showAccount: boolean = true;
  isLoading = true;
  address: string[] = [];
  constructor(public profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data: any) => {
        if (
          !data.image.includes(
            'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
          )
        )
          data.image = 'data:image/png;base64,' + data.image;
        this.userInfo = data;
        this.address = this.userInfo.address;
        console.log(this.userInfo);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/profile') {
          this.showAccount = true;
        } else {
          this.showAccount = false;
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  isAddressEmpty(): boolean {
    return this.address.length === 0;
  }
}
