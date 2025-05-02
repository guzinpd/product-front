// src/app/core/layout/header.component.ts
import { Component, ViewEncapsulation }      from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { MatToolbarModule }                 from '@angular/material/toolbar';
import { MatButtonModule  }                 from '@angular/material/button';
import { RouterModule     }                 from '@angular/router';
import { MatDialogModule, MatDialog }       from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar }   from '@angular/material/snack-bar';

import { LoginDialogComponent }             from '../../auth/login-dialog/login-dialog.component';
import { AuthService }                      from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,            // para ngIf, async
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,       // para o MatSnackBar
    LoginDialogComponent
  ],
  templateUrl: './header.component.html',
  styles: [`.spacer { flex: 1 1 auto; }`],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    public  auth: AuthService
  ) {}

  openLogin() {
    const ref = this.dialog.open(LoginDialogComponent, { width: '500px' });
    ref.afterClosed().subscribe(success => {
      if (success) {
        this.snack.open('Login efetuado com sucesso!', undefined, {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  onLogout() {
    this.auth.logout();
  }
}