import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, RouterOutlet, AccountComponent],
  providers: [ProfileService],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  userInfo: any = {};
  showAccount: boolean = true;
  constructor(public profileService: ProfileService, private router: Router) {
    this.profileService.getProfile().subscribe({
      next: (data:any) => {
        data.image = 'data:image/png;base64,' + data.image;
        console.log(data);

        this.userInfo = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
    router.events.subscribe((val) => {
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
}
