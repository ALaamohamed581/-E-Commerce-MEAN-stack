import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiace } from '../../../../../users/src/lib/services/UsersServiace';
import { Cart } from '../../../Modals/CartItem';
import { orderModal } from '../../../Modals/orderModal';
import { CartserviceService } from '../../../serivces/cartservice.service';
import { ordersService } from '../../../serivces/orders-service.service';
import { countriesIdsAndnames } from '../../../../../users/src/lib/coutries/coutries';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
@Component({
  selector: 'orders-checkout-page',
  templateUrl: './check-out-page.component.html',
  standalone: true,
  imports: [
    NgIf,
    InputMaskModule,
    CommonModule,
    ButtonModule,
    DropdownModule,
    OrderSummaryComponent,
    ReactiveFormsModule,
  ],
})
export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UserServiace,
    private formBuilder: FormBuilder,
    private cartService: CartserviceService,
    private ordersService: ordersService
  ) {}
  checkoutFormGroup?: any;
  isSubmitted = false;
  orderItems: any = [];
  userId = '665114cf26c7386c40a5dd53';
  countries: any = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
    console.log(this._getCountries());
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['alaa', Validators.required],
      email: ['alaa@yahh.com', [Validators.email, Validators.required]],
      phone: ['123123123123', Validators.required],
      city: ['222', Validators.required],
      country: ['23', Validators.required],
      zip: ['111', Validators.required],
      apartment: ['23', Validators.required],
      street: ['2323', Validators.required],
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item: any) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  private _getCountries() {
    this.countries = Object.entries(countriesIdsAndnames).map((el) => {
      return { id: el[0], name: el[1] };
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup?.invalid) {
      const order: orderModal = {
        orderItems: this.orderItems,
        shippingAddress1: this.checkoutForm.street.value,
        shippingAddress2: this.checkoutForm.apartment.value,
        city: this.checkoutForm.city.value,
        zip: this.checkoutForm.zip.value,
        country: this.checkoutForm.country.value,
        phone: this.checkoutForm.phone.value,
        status: 0,
        // totalPrice: this.checkoutForm.totalPrice.value,
        user: this.userId,
        dateOrdered: `${Date.now()}`,
      };
    }

    const order: orderModal = {
      orderItems: this.orderItems,
      shippingAddress1: (this.checkoutForm ?? {})['street']['value'],
      shippingAddress2: (this.checkoutForm ?? {})['apartment']['value'],
      city: (this.checkoutForm ?? {})['city']['value'],
      zip: (this.checkoutForm ?? {})['zip']['value'],
      country: (this.checkoutForm ?? {})['country']['value'],
      phone: (this.checkoutForm ?? {})['phone']['value'],
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };
    console.log(order, 'ffffffff');
    this.ordersService.createOrder(order).subscribe(
      () => {
        // redirect to thank you page // payment
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      () => {
        //display some message to user
      }
    );
  }

  get checkoutForm() {
    return this.checkoutFormGroup?.controls ?? '';
  }
}
