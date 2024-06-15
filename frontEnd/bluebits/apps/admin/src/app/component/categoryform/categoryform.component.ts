import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobaConfirmations } from '@bluebits/golbal-confiramtionlib';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoriesService, category } from '@bluebits/products';
import { Module } from '../../allModasl/ImportedModes';

@Component({
  selector: 'app-categoryform',
  standalone: true,
  imports: [...Module],
  templateUrl: './categoryform.component.html',
  styleUrl: './categoryform.component.css',
})
export class CategoryformComponent implements OnInit {
  form: FormGroup;
  cat: category = {};
  currentCategoryId?: string;
  editMode = false;
  isSubbmuted = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageSerivrace: MessageService,
    private route: ActivatedRoute,
    private global: GlobaConfirmations
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      Icon: ['', Validators.required],
      color: ['#ffffff'],
    });
  }
  ngOnInit(): void {
    this._checkEditMode();
  }
  Onsubmit() {
    this.cat = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['Icon'].value,
      color: this.form.controls['color'].value,
    };
    this.isSubbmuted = true;
    if (this.form.invalid) return;
    this.global.updateandCreateConfrmationsmeaasges(
      this.categoryService.createCategoty(this.cat),
      this.cat,
      'Create'
    );
  }
  private _checkEditMode() {
    this.route.params.subscribe((para) => {
      if (para['id']) {
        this.editMode = true;
        this.currentCategoryId = para['id'];
        this.categoryService
          .getCategoryById(para['id'])
          .subscribe((category) => {
            this.form.controls['name'].setValue(category.name);
            this.form.controls['Icon'].setValue(category.icon);
            this.form.controls['color'].setValue(category.color);
            this.cat = category;
            this.cat.id = this.currentCategoryId;
          });
      } else {
        return;
      }
    });
  }
  UpdateData() {
    this.cat.name = this.form.controls['name'].value;
    this.cat.icon = this.form.controls['Icon'].value;
    this.cat.color = this.form.controls['color'].value;
    this.global.updateandCreateConfrmationsmeaasges(
      this.categoryService.UpdatecategoryData(this.cat),
      this.cat,
      'Updated'
    );
  }
}
