import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserPartielState, userState } from './session.reducer';
export const getUsersState = createFeatureSelector<UserPartielState, userState>(
  'Users_EATURES_KEY'
);
export const getUser = createSelector(getUsersState, (state) => state.user);
export const getisAuthenticated = createSelector(
  getUsersState,
  (state) => state.isAuthentiacted
);
