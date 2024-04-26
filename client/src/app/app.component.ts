import { UserServiceService } from './services/user/user-service.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ContactUsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLogged: Boolean = true;

  constructor(private useLog: UserServiceService) {}
  ngOnInit(): void {
    this.isLogged = !this.useLog.isAdmin();
    // console.log(this.useLog.isAdmin());
    // throw new Error('Method not implemented.');
  }
  title = 'client';
}
