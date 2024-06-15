import { Component, OnInit } from '@angular/core';
import { CategoriesService, category } from '@bluebits/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Module } from '../../allModasl/ImportedModes';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [...Module],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categories: category[] = [];
  category?: category;
  constructor(
    private CategoriesService: CategoriesService,
    private messageSerivrace: MessageService,
    private c_serive: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getcategories();
  }
  delteCategory(id: string) {
    this.c_serive.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete categoty',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CategoriesService.DeleteCategory(id).subscribe(
          () => {
            this.category = this.categories.find((el) => (el.id = id));
            this._getcategories();
            this.messageSerivrace.add({
              severity: 'success',
              summary: 'serviace meesage',
              detail: `${this.category?.name}, has been delete`,
            });
          },
          () => {
            this.messageSerivrace.add({
              severity: 'error',
              summary: 'serviace meesage',
              detail: `Faild to create Category !`,
            });
          }
        );
      },
      reject: () => console.log(`You have rejectd the updated`),
    });
  }
  updatedCategory(id: string) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }
  private _getcategories() {
    this.CategoriesService.getCategories().subscribe(
      (obs) => (this.categories = obs)
    );
  }
}
