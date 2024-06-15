import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartserviceService } from '../../../serivces/cartservice.service';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(private cartService: CartserviceService) {}
}
