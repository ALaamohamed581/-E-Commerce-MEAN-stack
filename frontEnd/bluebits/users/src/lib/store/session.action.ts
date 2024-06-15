import { createAction, props } from '@ngrx/store';
import { UserModel } from '../Models/UserModel';
export const buildUserSession = createAction('[Usrs] Build User Session');
export const buildUserSessionSuccess = createAction(
  '[Usrs] Build User Session Sucsess',
  props<{ user: UserModel }>()
);
export const buildUserSessionFaliure = createAction('[Usrs] buildUserFaliure');
