import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './component/HomePage/homePage.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { UiBannerComponent } from '@bluebits/ui';
import { CartserviceService } from '@bluebits/orders';
import { UserServiace } from '@bluebits/users';
import { AsyncPipe } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    UiBannerComponent,
    RouterModule,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cartCount: any;
  constructor(
    private cartService: CartserviceService,
    private userService: UserServiace
  ) {}
  ngOnInit(): void {
    this.cartService.initLoclaStorage();
    this.cartService.cart$.subscribe((cart) =>
      cart === null || undefined ? cart.items.length : 0
    );
    this.cartCount = this.userService.initAppSessition();
  }
  title = 'bluebits';
}
