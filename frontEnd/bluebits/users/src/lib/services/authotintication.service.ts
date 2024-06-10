import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/UserModel';
import { HttpClient } from '@angular/common/http';
import { LocalStrogeService } from './local-stroge.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthotinticationService {
  constructor(
    private http: HttpClient,
    private token: LocalStrogeService,
    private router: Router
  ) {}
  Login(email: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(
      `http://localhost:3000/api/v1/users/login`,
      { email, password }
    );
  }
  logout() {
    this.token.removeItem();
    this.router.navigate(['/login']);
  }
}
