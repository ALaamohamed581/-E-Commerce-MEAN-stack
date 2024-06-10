import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { category } from '../lib/modals/categoryModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<category[]> {
    return this.http.get<category[]>('http://localhost:3000/api/v1/categories');
  }
  numberOfProductsInCategory(): Observable<category[]> {
    return this.http.get<category[]>('http://localhost:3000/api/v1/dash');
  }
  getCategoryById(id: string): Observable<category> {
    return this.http.get<category>(
      `http://localhost:3000/api/v1/categories/${id}`
    );
  }
  createCategoty(cat: category): Observable<category> {
    return this.http.post<category>(
      'http://localhost:3000/api/v1/categories',
      cat
    );
  }
  DeleteCategory(id: string): Observable<object> {
    return this.http.delete<object>(
      `http://localhost:3000/api/v1/categories/${id}`
    );
  }
  UpdatecategoryData(cat: category) {
    return this.http.put<object>(
      `http://localhost:3000/api/v1/categories/${cat.id}`,
      cat
    );
  }
}
