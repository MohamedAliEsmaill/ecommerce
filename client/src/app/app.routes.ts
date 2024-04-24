import { Routes } from '@angular/router';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { IsAdminService } from './services/is-admin/is-admin.service';
import { IsUserService } from './services/is-user/is-user.service';
import { IsLoggedService } from './services/is-logged/is-logged.service';
import { IsNotLoggedService } from './services/is-not-logged/is-not-logged.service';
import { ForgotPasswordComponent } from './layouts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { CatalogComponent } from './layouts/catalog/catalog.component';
import { ProductOverviewComponent } from './layouts/product-overview/product-overview.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'home', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [IsLoggedService,IsUserService],
  },
  {
    path: 'product-overview/:id',
    component: ProductOverviewComponent,
    canActivate: [IsLoggedService,IsUserService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'information', component: ProfileInformationComponent },
      { path: 'wishlist', component: WishlistComponent },
    ],
    canActivate: [IsLoggedService, IsUserService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsNotLoggedService],
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
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [IsLoggedService, IsUserService],
  },
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  //   canActivate: [!AuthServiceService],
  // },
];
