import { Component, OnInit } from '@angular/core';

import { orderModal, ordersService } from '@bluebits/orders';
import { ActivatedRoute, Router } from '@angular/router';
import { ORDER_STATUS } from '@bluebits/orders';
import { GlobaConfirmations } from '@bluebits/golbal-confiramtionlib';
import { Module } from '../../allModasl/ImportedModes';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [...Module],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  currentOrderId?: string;
  Order: orderModal = {} as orderModal;
  ordrsStatus: object[] = [];
  selectedStatus?: number;
  constructor(
    private orderService: ordersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private global: GlobaConfirmations
  ) {}
  ngOnInit(): void {
    this.mapOrderstaus();
    this.getOrder();
  }

  View(id: string) {
    this.router.navigateByUrl(`orders/${id}`);
  }
  private getOrder() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentOrderId = params['id'];
    });
    this.orderService
      .getOrderById(this.currentOrderId ?? '')
      .subscribe((orders) => {
        this.Order = orders;

        console.log(this.Order);
      });
  }
  private mapOrderstaus() {
    this.ordrsStatus = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }
  change(event: any) {
    this.orderService
      .UpdateOrderData({ status: event.value }, this.Order.id ?? '')
      .subscribe();

    this.global.updateandCreateConfrmationsmeaasges(
      this.orderService.UpdateOrderData(
        { status: event.value },
        this.Order.id ?? ''
      ),
      this.Order.id,
      'Updated'
    );
  }
}
