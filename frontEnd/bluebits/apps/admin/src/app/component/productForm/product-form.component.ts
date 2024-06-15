import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { GlobaConfirmations } from '@bluebits/golbal-confiramtionlib';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import {
  CategoriesService,
  category,
  productSerivce,
} from '@bluebits/products';
import { Module } from '../../allModasl/ImportedModes';

@Component({
  selector: 'app-categoryform',
  standalone: true,
  imports: [...Module],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  cat: category = {};
  editMode = false;
  CurrentProductId!: string;

  isSubbmuted = false;
  categoriesNames: category[] = [];
  imgDisplay?: any;
  constructor(
    private formBuilder: FormBuilder,
    private ProductService: productSerivce,
    private messageSerivrace: MessageService,
    private route: ActivatedRoute,
    private categoriesSerivce: CategoriesService,
    private global: GlobaConfirmations
  ) {}
  ngOnInit(): void {
    this._initForm();
    this.GetAllcateogores();
    this._checkEditMode();
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: [''],
      countInStock: [[''], Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }
  private getProductForm() {
    return this.form.controls;
  }
  private GetAllcateogores() {
    this.categoriesSerivce.getCategories().subscribe((obs) => {
      this.categoriesNames = [...obs];
      return this.categoriesNames;
    });
  }
  OnImageUpload(event: any | Event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imgDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.isSubbmuted = true;

    if (this.form.invalid) return;
    const ProductFormData = new FormData();

    Object.keys(this.getProductForm()).map((key) => {
      ProductFormData.append(key, this.getProductForm()[key].value);
    });
    if (this.editMode) {
      this.global.updateandCreateConfrmationsmeaasges(
        this.ProductService.UdateProductData(
          this.CurrentProductId,
          ProductFormData
        ),
        this.getProductForm()['name'].value,
        'Update'
      );
    } else {
      this.global.updateandCreateConfrmationsmeaasges(
        this.ProductService.craeteProduct(ProductFormData),
        this.getProductForm()['name'].value,
        'Created'
      );
    }
  }
  private _checkEditMode() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.CurrentProductId = param['id'];
        this.editMode = true;
        this.ProductService.getProductById(param['id']).subscribe((product) => {
          this.getProductForm()['name'].setValue(product.name);
          this.getProductForm()['brand'].setValue(product.brand);
          this.getProductForm()['price'].setValue(product.price);
          this.getProductForm()['category'].setValue(product.category?.id);
          this.getProductForm()['countInStock'].setValue(product.countInStock);
          this.getProductForm()['description'].setValue(product.description);
          this.getProductForm()['richDescription'].setValue(
            product.richDescription
          );
          this.imgDisplay = product.image;
          this.getProductForm()['image'].setValue(this.imgDisplay);
          this.getProductForm()['isFeatured'].setValue(product.isFeatured);
          this.getProductForm()['image'].setValidators([]);
        });
      }
    });
  }
}
