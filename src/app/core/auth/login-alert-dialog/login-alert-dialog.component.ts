// src/app/core/auth/login-alert-dialog.component.ts
import { Component }           from '@angular/core';
import { MatDialogModule }     from '@angular/material/dialog';
import { MatButtonModule }     from '@angular/material/button';

@Component({
  selector: 'app-login-alert-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './login-alert-dialog.component.html', 
})
export class LoginAlertDialogComponent {}
