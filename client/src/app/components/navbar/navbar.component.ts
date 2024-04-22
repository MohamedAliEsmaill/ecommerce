import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  toggleBurgerMenu = false;

  toggleMenu() {
    this.toggleBurgerMenu = !this.toggleBurgerMenu;
  }
}
