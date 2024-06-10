import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { orderModal } from '../Modals/orderModal';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ordersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<orderModal[]> {
    return this.http.get<orderModal[]>('http://localhost:3000/api/v1/orders');
  }
  ordersPerCountry(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/v1/dash/orders');
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
  UpdateOrderData(orderstatus: { status: string }, orderID: any) {
    console.log(status, 'from the service');
    console.log(orderID, 'from the service');
    return this.http.put<object>(
      `http://localhost:3000/api/v1/orders/${orderID}`,
      orderstatus
    );
  }
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/products/${id}`);
  }
}
