import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import * as reducers from '../src/lib/store/session.reducer';
export const usersConfig: any = {
  providers: [
    provideEffects(),

    provideHttpClient(withFetch()),

    provideStore({ newAction: reducers.usersReducers }),
  ],
};
