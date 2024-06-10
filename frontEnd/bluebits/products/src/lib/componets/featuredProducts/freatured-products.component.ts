import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../modals/ProductModel';
import { productSerivce } from '../../../service/productService';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'freatured-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './freatured-products.component.html',
  styleUrl: './freatured-products.component.css',
})
export class FreaturedProductsComponent implements OnDestroy {
  endSubs: Subject<any> = new Subject();
  featruedproducts: Product[] = [];
  constructor(private productService: productSerivce) {}
  ngOnInit(): void {
    this.get_featuredProducts();
  }
  private get_featuredProducts() {
    this.productService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs))
      .subscribe((products) => (this.featruedproducts = products));
  }
  ngOnDestroy(): void {
    this.endSubs.next;
    this.endSubs.complete();
  }
}
