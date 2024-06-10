import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../NAVBAR/navbar/navbar.component';
import { ProductsSearchComponent } from '@bluebits/products';
import { RouterOutlet } from '@angular/router';
import { CarticonComponent } from '@bluebits/orders';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CarticonComponent,
    CommonModule,
    NavbarComponent,
    ProductsSearchComponent,
    RouterOutlet,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
