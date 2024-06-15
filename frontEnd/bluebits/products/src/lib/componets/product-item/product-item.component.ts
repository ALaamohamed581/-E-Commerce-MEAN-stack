import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../modals/ProductModel';
import { RouterLink } from '@angular/router';
import { CartserviceService } from '../../../../../orders/src';
import { CartItem } from '../../../../../orders/src/Modals/CartItem';
@Component({
  selector: 'product-item',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() product?: Product;
  constructor(private cartService: CartserviceService) {}
  addProductTOCart() {
    const CartIem: CartItem = {
      productId: this.product?.id,
      quantity: 1,
    };
    this.cartService.setCartItem(CartIem);
  }
}
