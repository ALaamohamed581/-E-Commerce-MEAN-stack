import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CartserviceService } from '../../../serivces/cartservice.service';
import { ordersService } from '../../../serivces/orders-service.service';
import { CartItem, cartItem } from '../../../Modals/CartItem';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'cart-page',
  standalone: true,

  imports: [
    OrderSummaryComponent,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartItemDetalis: cartItem[] = [];
  quantity = 1;
  constructor(
    private router: Router,
    private cartServce: CartserviceService,
    private orderService: ordersService
  ) {}
  ngOnInit(): void {
    this.getCartDetails();
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  private getCartDetails() {
    this.cartServce.cart$.pipe().subscribe((resCart) => {
      this.cartItemDetalis = [];
      resCart.items?.forEach((cartItem) => {
        this.orderService
          .getProductById(cartItem.productId ?? '')
          .subscribe((el: any) => {
            this.cartItemDetalis.push({
              product: el,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }
  deleteCartItem(cartItem: string) {
    return this.cartServce.deltetCatrIte(cartItem);
  }
}
