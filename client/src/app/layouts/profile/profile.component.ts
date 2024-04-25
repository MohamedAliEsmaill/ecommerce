import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WishlistComponent } from '../../components/wishlist/wishlist.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, RouterOutlet, WishlistComponent],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {

}
