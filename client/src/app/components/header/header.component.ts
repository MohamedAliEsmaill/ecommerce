import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  toggleBurgerMenu = false;

  toggleMenu() {
    this.toggleBurgerMenu = !this.toggleBurgerMenu;
  }
}
