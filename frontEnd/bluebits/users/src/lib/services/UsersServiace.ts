import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/UserModel';
import { LocalStrogeService } from './local-stroge.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiace {
  constructor(private http: HttpClient, private token: LocalStrogeService) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:3000/api/v1/users', {
      headers: { authorization: `Bearer ${this.token.getitem()}` },
    });
  }
  getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`http://localhost:3000/api/v1/users/${id}`);
  }
  craeteUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(
      'http://localhost:3000/api/v1/users',
      user
    );
  }
  DeleteUser(id: string): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/api/v1/users/${id}`);
  }
  UdateUserData(id: string, user: UserModel) {
    console.log(id, ';form the api');
    return this.http.put<UserModel>(
      `http://localhost:3000/api/v1/users/${id}`,
      user
    );
  }
}
