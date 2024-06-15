import { Component, OnInit } from '@angular/core';

import { Product } from '@bluebits/products';
import { productSerivce } from '@bluebits/products';
import { Router } from '@angular/router';
import { Module } from '../../allModasl/ImportedModes';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [...Module],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];
  constructor(private productSerivce: productSerivce, private router: Router) {}
  ngOnInit(): void {
    this._getAllProducts();
  }
  private _getAllProducts() {
    this.productSerivce
      .getAllProducts()
      .subscribe((obs) => (this.Products = obs));
  }
  deleteProdcut(id: string) {
    this.productSerivce.DeleteProduct(id).subscribe();
    this._getAllProducts();
  }
  updatedProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }
}
