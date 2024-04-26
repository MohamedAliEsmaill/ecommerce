import { Routes } from '@angular/router';
import { ContactUsComponent } from './layouts/contact-us/contact-us.component';
import { AboutUsComponent } from './layouts/about-us/about-us.component';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { AuthServiceService } from './services/auth/auth-service.service';
import { IsLoggedService } from './services/is-logged/is-logged.service';
import { ForgotPasswordComponent } from './layouts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { CheckOutComponent } from './layouts/check-out/check-out.component';
import { CatalogComponent } from './layouts/catalog/catalog.component';
import { ProductOverviewComponent } from './layouts/product-overview/product-overview.component';
import { ProfileComponent } from './layouts/profile/profile.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { CardIsNotEmptyService } from './services/card-is-not-empty/card-is-not-empty.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
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
    path: 'product-overview/:id',
    component: ProductOverviewComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'information', component: ProfileInformationComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'history', component: OrderHistoryComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
    ],
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
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [CardIsNotEmptyService],
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
