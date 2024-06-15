import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../lib/modals/ProductModel';
@Injectable({
  providedIn: 'root',
})
export class productSerivce {
  constructor(private http: HttpClient) {}

  getAllProducts(categoresFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoresFilter) {
      params = params.append('categories', categoresFilter.join(','));

    }

    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', {
      params,
    });
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(
      `http://localhost:3000/api/v1/products/${id}`
    );
  }
  getProductByCatId(id: string): Observable<Product> {
    return this.http.get<Product>(
      `http://localhost:3000/api/v1/products/${id}`
    );
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:3000/api/v1/products/get/featured/${count}`
    );
  }
  craeteProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(
      'http://localhost:3000/api/v1/products',
      product
    );
  }
  DeleteProduct(id: string): Observable<object> {
    return this.http.delete<object>(
      `http://localhost:3000/api/v1/products/${id}`
    );
  }
  UdateProductData(id: string, product: any) {
    console.log(id, ';form the api');
    return this.http.put<Product>(
      `http://localhost:3000/api/v1/products/${id}`,
      product
    );
  }
}
