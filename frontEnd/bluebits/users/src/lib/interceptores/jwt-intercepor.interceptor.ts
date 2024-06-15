import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { LocalStrogeService } from '../services/local-stroge.service';

export const jwtInterceporInterceptor: any = (req: any, next: any) => {
  const isUsersApi = req.url.includes('http://localhost:3000/api/v1/users');
  const token = new LocalStrogeService().getitem();

  if (token && isUsersApi) {
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }
};
