import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  toggleBurgerMenu = false;

  toggleMenu() {
    this.toggleBurgerMenu = !this.toggleBurgerMenu;
  }
}
