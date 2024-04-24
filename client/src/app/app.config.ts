import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { userInterceptorInterceptor } from './interceptors/user/user-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([userInterceptorInterceptor])),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
  ],
};
