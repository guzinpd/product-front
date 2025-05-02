// src/app/core/core.module.ts
import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule }       from '../shared/material/material.module';
import { HeaderComponent }      from './layout/header/header.component';
import { JwtInterceptor }       from './auth/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
