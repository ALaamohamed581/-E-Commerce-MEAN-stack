import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../Models/UserModel';
import * as usersAction from './session.action';
export const initelUsersState: userState = {
  user: null,
  isAuthentiacted: false,
};

export const Users_EATURES_KEY = 'users';

export interface userState {
  user: UserModel;
  isAuthentiacted: boolean;
}
export interface UserPartielState {
  readonly Users_EATURES_KEY: userState;
}

export const usersReducers = createReducer(
  initelUsersState,
  on(usersAction.buildUserSession, (state) => ({ ...state })),
  on(usersAction.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthentiacted: true,
  })),
  on(usersAction.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: null,
    isAuthentiacted: false,
  }))
);
