import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as usersActions from './session.action';
import { concatMap, of } from 'rxjs';
import { LocalStrogeService } from '../services/local-stroge.service';
import { UserServiace } from '../services/UsersServiace';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsersEffectService {
  cureetUser$ = this.store.select('newAction');
  IsAuthenticated$ = this.store.select('getisAuthenticated');
  BBulidUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserId();
          if (userId) {
            return this.userSerivce.getUserById(userId).pipe(
              map((user) => {
                return usersActions.buildUserSessionSuccess({ user: user });
              })
            );
          } else {
            return of(usersActions.buildUserSessionFaliure());
          }
        } else {
          return of(usersActions.buildUserSessionFaliure());
        }
      })
    )
  );
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStrogeService,
    private userSerivce: UserServiace,
    private store: Store<{ newAction: any; getisAuthenticated: any }>
  ) {}
  observeCurrentUser() {
    return this.cureetUser$;
  }
}
