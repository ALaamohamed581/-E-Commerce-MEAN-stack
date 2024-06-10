import { Route } from '@angular/router';

import { LoginComponent } from './components/Login/login.component';
export const UserRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
];
