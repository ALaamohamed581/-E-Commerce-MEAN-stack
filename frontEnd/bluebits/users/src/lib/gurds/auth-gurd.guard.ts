import { CanActivateFn, Router } from '@angular/router';
import { LocalStrogeService } from '../services/local-stroge.service';
import { inject } from '@angular/core';
export const authGurdGuard: CanActivateFn = () => {
  const token = new LocalStrogeService().getitem();
  const router = inject(Router);
  if (token) {
    const decodaedToken = JSON.parse(atob(token.split('.')[1]));

    const expriedata =
      Math.floor(new Date().getTime() / 1000) >= decodaedToken.exp;

    if (decodaedToken.isAdmin && !expriedata) return true;
  }
  router.navigate(['/login']);

  return false;
};
