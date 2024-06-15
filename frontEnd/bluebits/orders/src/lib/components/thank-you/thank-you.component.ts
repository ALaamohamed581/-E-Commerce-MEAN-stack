import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ordersService } from '../../../serivces/orders-service.service';
import { CartserviceService } from '../../../serivces/cartservice.service';
@Component({
  selector: 'thank-you',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css',
})
export class ThankYouComponent implements OnInit {
  constructor(
    private ordersService: ordersService,
    private cartService: CartserviceService
  ) {}
  ngOnInit(): void {
    const data = this.ordersService.retirveOrderData();
    this.ordersService.createOrder(data).subscribe(() => {
      this.cartService.emptyCart();
      this.ordersService.removeCachedOrderData();
    });
  }
}
