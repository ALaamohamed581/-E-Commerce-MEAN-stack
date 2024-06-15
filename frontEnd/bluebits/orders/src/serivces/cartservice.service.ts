import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../Modals/CartItem';
import { BehaviorSubject } from 'rxjs';
export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  initLoclaStorage() {
    const cart = this.getCart();
    if (!cart) {
      const initalCart = { items: [] };
      const intielJsonCart = JSON.stringify(initalCart);
      localStorage.setItem(CART_KEY, intielJsonCart);
      console.log(this.getCart());
    } else {
      this.cart$.next(cart);
    }
  }
  getCart() {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    return cart;
  }
  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();
    // check if pordcut alread in local stoage
    if (!localStorage.getItem(CART_KEY)) this.initLoclaStorage();
    //check if catr laedy has the product and if so increase thq quatity
    const cartItemExisits = cart.items?.find(
      (prd) => prd.productId == cartItem.productId
    );
    if (cartItemExisits) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity! + cartItem.quantity!;
          console.log(item.quantity);
        }
      });
    } else {
      cart.items?.push(cartItem);
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }
  deltetCatrIte(id: string) {
    const cart = this.getCart();
    const newcart = cart.items?.filter((prd) => prd.productId != id);
    cart.items = newcart;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }
  emptyCart() {
    const intialCart = {
      items: [],
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }
}
