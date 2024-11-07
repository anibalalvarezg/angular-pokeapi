import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore, Store } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { PokemonState } from './state/pokemon/pokemon.state';
import { PokemonActions } from './state/pokemon/pokemon.actions';
import { firstValueFrom } from 'rxjs';

function initializeApp(store: Store) {
  return () => firstValueFrom(store.dispatch(new PokemonActions.GetTotal()));
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideStore(
    [PokemonState],
    withNgxsReduxDevtoolsPlugin(),
    withNgxsLoggerPlugin()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Store],
      multi: true
    }
  ]
};
