import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { orderModal } from '../Modals/orderModal';
import { Observable, switchMap } from 'rxjs';
import { OrderItem } from '../Modals/orderItem';
import { StripeService } from 'ngx-stripe';
@Injectable({
  providedIn: 'root',
})
export class ordersService {
  constructor(private http: HttpClient, private striepService: StripeService) {}

  getOrders(): Observable<orderModal[]> {
    return this.http.get<orderModal[]>('http://localhost:3000/api/v1/orders');
  }
  ordersPerCountry(): Observable<orderModal> {
    return this.http.get<orderModal>(
      'http://localhost:3000/api/v1/dash/orders'
    );
  }

  getOrderById(id: string): Observable<orderModal> {
    return this.http.get<orderModal>(
      `http://localhost:3000/api/v1/orders/${id}`
    );
  }
  createOrder(cat: orderModal): Observable<orderModal> {
    return this.http.post<orderModal>(
      'http://localhost:3000/api/v1/orders',
      cat
    );
  }
  DeleteOrder(id: string): Observable<object> {
    return this.http.delete<object>(
      `http://localhost:3000/api/v1/orders/${id}`
    );
  }
  UpdateOrderData(orderstatus: { status: string }, orderID: string) {
    return this.http.put<object>(
      `http://localhost:3000/api/v1/orders/${orderID}`,
      orderstatus
    );
  }
  getProductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/products/${id}`);
  }
  createCheckOutSession(orderItem: OrderItem[]) {
    return this.http
      .post(
        `http://localhost:3000/api/v1/orders/create-checkout-session`,
        orderItem
      )
      .pipe(
        switchMap((session: any) => {
          const { id } = session;
          return this.striepService.redirectToCheckout({
            sessionId: id,
          });
        })
      );
  }
  cachOrderData(order: orderModal) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }
  retirveOrderData(): orderModal {
    const data = localStorage.getItem('orderData');

    const dataJson = JSON.parse(data ?? '{}');
    return dataJson;
  }
  removeCachedOrderData() {
    JSON.parse(localStorage.getItem('orderData') ?? '');
  }
}
