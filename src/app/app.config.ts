import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { appReducer } from './shared/widgets/pages/store/app.state';
import { HouseholdEffects } from './shared/widgets/pages/store/household-types/household.effects';
import { provideEffects } from '@ngrx/effects';
import { HouseholdOverviewEffects } from './shared/widgets/pages/store/household-overview/household-overview.effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { householdTypeReducer } from './shared/widgets/pages/store/household-types/household.reducer';
import { AuthInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideEffects([HouseholdEffects,HouseholdOverviewEffects]),
    provideStore(appReducer),
  ]
};
