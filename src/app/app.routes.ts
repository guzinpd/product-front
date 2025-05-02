import { Routes } from '@angular/router';
import { ListComponent } from './features/products/list/list.component';
import { LoginDialogComponent } from './core/auth/login-dialog/login-dialog.component';

export const routes: Routes = [
    { path: '',    component: ListComponent },
    { path: 'login', component: LoginDialogComponent },
  // ...
];
