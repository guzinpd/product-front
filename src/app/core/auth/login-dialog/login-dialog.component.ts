import { Component, OnInit }               from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef }                    from '@angular/material/dialog';
import { AuthService }                     from '../auth.service';

import { MatDialogModule }                 from '@angular/material/dialog';
import { MatFormFieldModule }              from '@angular/material/form-field';
import { MatInputModule }                  from '@angular/material/input';
import { MatButtonModule }                 from '@angular/material/button';
import { ReactiveFormsModule }             from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-dialog.component.html',
  styles: [`
    .full-width { width: 100%; }
  `]
})
export class LoginDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: () => this.form.setErrors({ invalid: true })
      });
    }
  }
}
