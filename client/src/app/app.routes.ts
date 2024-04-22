import { Routes } from '@angular/router';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';

export const routes: Routes = [
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent }
];
