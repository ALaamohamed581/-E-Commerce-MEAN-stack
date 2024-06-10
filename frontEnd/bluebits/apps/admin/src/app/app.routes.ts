import { Route } from '@angular/router';
import { ShellComponent } from './component/shell/shell.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { CategoryformComponent } from './component/categoryform/categoryform.component';
import { ProductListComponent } from './component/productList/product-list.component';
import { ProductFormComponent } from './component/productForm/product-form.component';
import { UsersListComponent } from './component/UsersList/users-list/users-list.component';
import { UsersFormComponent } from './component/users-form/users-form.component';
import { OrdersListComponent } from './component/OrdersList/OrdersList.component';
import { DetailsComponent } from './component/OrderDetails/details.component';
import { LoginComponent } from 'users/src/lib/components/Login/login.component';
import { authGurdGuard } from '@bluebits/users';
export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    // canActivate: [authGurdGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'users/form', component: UsersFormComponent },
      { path: 'users/form/:id', component: UsersFormComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/form', component: ProductFormComponent },
      { path: 'products/form/:id', component: ProductFormComponent },
      { path: 'categories', component: CategoriesComponent },

      { path: 'categories/form', component: CategoryformComponent },
      { path: 'categories/form/:id', component: CategoryformComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:id', component: DetailsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
