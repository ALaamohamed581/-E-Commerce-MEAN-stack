import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { category } from '../../modals/categoryModel';
import { CategoriesService } from '../../../../../products/src/service/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'categories-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories-banner.component.html',
  styleUrl: './categories-banner.component.css',
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: category[] = [];
  endSubs: Subject<any> = new Subject();
  constructor(private categoresServicer: CategoriesService) {}
  ngOnInit(): void {
    this.categoresServicer
      .getCategories()
      .pipe(takeUntil(this.endSubs))
      .subscribe((categories) => (this.categories = categories)).unsubscribe;
  }
  ngOnDestroy(): void {
    this.endSubs.next;
    this.endSubs.complete();
  }
}
