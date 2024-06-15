import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-ui-banner',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './ui-banner.component.html',
  styleUrl: './ui-banner.component.css',
})
export class UiBannerComponent {}
