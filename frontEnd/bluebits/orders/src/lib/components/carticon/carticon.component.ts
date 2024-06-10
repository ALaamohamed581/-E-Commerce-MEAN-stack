import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartserviceService } from 'orders/src/serivces/cartservice.service';
import { BadgeModule } from 'primeng/badge';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'carticon',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeModule],
  templateUrl: './carticon.component.html',
  styleUrl: './carticon.component.css',
})
export class CarticonComponent implements OnInit {
  cartCount: any = 0;
  constructor(private cartService: CartserviceService) {}
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.items?.length;
    });
  }
}
