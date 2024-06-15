import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStrogeService {
  Token = 'jwt';

  swtItem(data: any) {
    localStorage.setItem(this.Token, data);
  }
  getitem(): string {
    return <string>localStorage.getItem(this.Token);
  }
  removeItem() {
    localStorage.removeItem(this.Token);
  }
  isValidToken() {
    const token = this.getitem();
    if (token) {
      const tokenDecod = JSON.parse(atob(token.split('.')[1]));
      const expriedata =
        Math.floor(new Date().getTime() / 1000) >= tokenDecod.exp;
      if (!expriedata) {
        return true;
      } else return false;
    } else return false;
  }
  getUserId() {
    const token = this.getitem();
    if (token) {
      const tokenDecod = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecod) {
        return tokenDecod.userId;
      }
    } else null;
  }
}
