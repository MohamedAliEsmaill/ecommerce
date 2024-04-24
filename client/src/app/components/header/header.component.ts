import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  toggleBurgerMenu = false;

  toggleMenu() {
    this.toggleBurgerMenu = !this.toggleBurgerMenu;
  }

  closeMenu() {
    this.toggleBurgerMenu = false;
  }
}
