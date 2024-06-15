import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, take, takeUntil } from 'rxjs';
import { CartserviceService } from '../../../serivces/cartservice.service';
import { ordersService } from '../../../serivces/orders-service.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'order-summary',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  totalPrice: number = 0;
  // isCheckout = false;

  constructor(
    private router: Router,
    private cartService: CartserviceService,
    private ordersService: ordersService
  ) {
    // this.router.url.includes('checkout')
    //   ? (this.isCheckout = true)
    //   : (this.isCheckout = false);
  }
  ngOnInit(): void {
    this._getOrderSummary();
  }
  ngOnDestroy(): void {
    this.endSubs$.next('');
    this.endSubs$.complete();
  }
  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.ordersService
            .getProductById(item?.productId || '')
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * (item.quantity || 1);
              console.log(this.totalPrice);
            });
        });
      }
    });
  }
  navigateToCheckout() {
    alert('qwe');
    this.router.navigate(['/checkout']);
  }
}
