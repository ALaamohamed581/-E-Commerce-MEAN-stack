import { Route } from '@angular/router';
import { HomePageComponent } from './component/HomePage/homePage.component';
import {
  ProductDetailsComponent,
  ProductListComponent,
} from '@bluebits/products';
import { LoginComponent } from 'users/src/lib/components/Login/login.component';
import {
  CartPageComponent,
  CheckoutPageComponent,
  ThankYouComponent,
} from '@bluebits/orders';
import { authGurdGuard } from '@bluebits/users';
export const appRoutes: Route[] = [
  { path: 'home', component: HomePageComponent },
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:prodictId', component: ProductDetailsComponent },
  { path: 'category/:categoryId', component: ProductListComponent },
  { path: 'cart', component: CartPageComponent },
  {
    path: 'checkout',
    canActivate: [authGurdGuard],
    component: CheckoutPageComponent,
  },
  { path: 'success', component: ThankYouComponent },
  { path: 'login', component: LoginComponent },
];
