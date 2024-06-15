import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { UiBannerComponent } from '@bluebits/ui';
import { CategoriesBannerComponent } from '@bluebits/products';
import { FreaturedProductsComponent } from '@bluebits/products';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FreaturedProductsComponent,
    CategoriesBannerComponent,
    AccordionModule,
    UiBannerComponent,
  ],
  templateUrl: './homePage.component.html',
})
export class HomePageComponent {}
