import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../modals/ProductModel';
import { productSerivce } from '../../../service/productService';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GalleryComponentComponent } from '../../../../../ui/src';
import { CartItem } from '../../../../../orders/src';
import { CartserviceService } from '../../../../../orders/src';
@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    GalleryComponentComponent,
    CommonModule,
    RatingModule,
    InputNumberModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product = {};
  images: any = [];
  quantity = 1;
  endsSubs: Subject<any> = new Subject();
  constructor(
    private productService: productSerivce,
    private activatedRoute: ActivatedRoute,
    private cartService: CartserviceService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['prodictId']) {
        this.getProduct(params['prodictId']);
        console.log(this.product);
      }
    });
  }
  private getProduct(id: string) {
    this.productService
      .getProductById(id)
      .pipe(takeUntil(this.endsSubs))
      .subscribe((resproduct) => {
        const { images } = resproduct;
        this.images = images;
        console.log(this.images);
        return (this.product = resproduct);
      });
  }
  ngOnDestroy(): void {
    this.endsSubs.next(this.endsSubs);
    this.endsSubs.complete();
  }
  AddProductItem() {
    const cartIte: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartIte);
  }
}
