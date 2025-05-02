import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./features/products/list/list.component";
import { HeaderComponent } from './core/layout/header/header.component';
import { LoginDialogComponent } from './core/auth/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListComponent, HeaderComponent, LoginDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'desafio-frontend-angular';
}
