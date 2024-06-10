import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './component/HomePage/homePage.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { UiBannerComponent } from '@bluebits/ui';
import { CartserviceService } from '@bluebits/orders';

@Component({
  standalone: true,
  imports: [
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
  cartCount = 0;
  constructor(private cartService: CartserviceService) {}
  ngOnInit(): void {
    this.cartService.initLoclaStorage();
    console.log(this.cartService.initLoclaStorage());
    this.cartService.cart$.subscribe((cart) =>
      cart === null || undefined ? cart.items.length : 0
    );
  }
  title = 'bluebits';
}
