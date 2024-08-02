import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { LoaderInterceptor } from './interceptor/interceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(DatePipe),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
};
