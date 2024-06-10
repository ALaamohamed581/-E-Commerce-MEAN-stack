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
}
