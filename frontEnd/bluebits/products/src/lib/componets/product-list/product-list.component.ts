import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../modals/ProductModel';
import { productSerivce } from '../../../service/productService';
import { CategoriesService } from '../../../service/categories.service';
import { category } from '../../modals/categoryModel';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CheckboxModule,
    CommonModule,
    FormsModule,
    ProductItemComponent,
    CheckboxModule,
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  prodcuts: Product[] = [];
  categories: category[] = [];
  FiltredCategores: category = {};
  FiltredProductss: Product[] = [];
  isCategoryPage = false;
  checked = false;
  constructor(
    private productService: productSerivce,
    private categoreiService: CategoriesService,
    private activatedRouter: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.activatedRouter.params.subscribe((parms) => {
      parms['categoryId']
        ? this.getProducts([parms['categoryId']])
        : this.getProducts();
      parms['categoryId'] ? (this.isCategoryPage = true) : false;
    });

    this.getCategories();
  }
  private getProducts(selectedProducts?: any) {
    this.productService
      .getAllProducts(selectedProducts)
      .subscribe((allProducts) => (this.prodcuts = allProducts));
  }
  private getCategories() {
    this.categoreiService
      .getCategories()
      .subscribe((allCategories) => (this.categories = allCategories));
  }
  CategoryFilter() {
    const selecteCategories: any[] = this.categories
      .filter((cat) => cat.checked)
      .map((category) => category.id);
    this.productService
      .getAllProducts(selecteCategories)
      .subscribe((allCategories) => (this.FiltredProductss = allCategories));
    this.getProducts(this.FiltredProductss);
  }
}
