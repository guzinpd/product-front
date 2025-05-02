import { bootstrapApplication }               from '@angular/platform-browser';
import { importProvidersFrom }                from '@angular/core';
import { provideRouter }                      from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent }       from './app/app.component';
import { routes }             from './app/app.routes';
import { JwtInterceptor }     from './app/core/auth/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    provideRouter(routes)
  ]
});
