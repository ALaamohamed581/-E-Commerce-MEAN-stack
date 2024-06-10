import { Component, OnInit } from '@angular/core';

import { orderModal, ordersService } from '@bluebits/orders';
import { ORDER_STATUS } from '@bluebits/orders';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobaConfirmations } from '@bluebits/golbal-confiramtionlib';
import { Module } from '../../allModasl/ImportedModes';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [Module],
  templateUrl: './OrdersList.component.html',
  styleUrl: './OrdersList.component.css',
})
export class OrdersListComponent implements OnInit {
  Orders: orderModal[] = [];
  Order?: orderModal;
  currentOrderId?: string | any;
  ordrsStatus: any = ORDER_STATUS;
  constructor(
    private orderService: ordersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private global: GlobaConfirmations
  ) {}
  ngOnInit(): void {
    this.getAllOrders();
  }
  DeletedOrder(id: string) {
    this.global.updateandCreateConfrmationsmeaasges(
      this.orderService.DeleteOrder(id),
      id,
      'Deleted'
    );
    this.getAllOrders();
  }
  View(id: string) {
    this.router.navigateByUrl(`orders/${id}`);
  }
  private getAllOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.Orders = orders;
    });
  }
}
