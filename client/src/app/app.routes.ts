import { Routes } from '@angular/router';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { AuthServiceService } from './services/auth/auth-service.service';
import { IsLoggedService } from './services/is-logged/is-logged.service';
import { ForgotPasswordComponent } from './layouts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { CatalogComponent } from './layouts/catalog/catalog.component';
export const routes: Routes = [
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsLoggedService],
  },
  {
    path: 'forget-password',
    component: ForgotPasswordComponent,
    canActivate: [IsLoggedService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [IsLoggedService],
  },

  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [!AuthServiceService],
  // },
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  //   canActivate: [!AuthServiceService],
  // },
  // {
  //   path: 'cart',
  //   component: CartComponent,
  //   canActivate: [!AuthServiceService],
  // },
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  //   canActivate: [!AuthServiceService],
  // },
];
