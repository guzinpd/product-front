// src/app/features/products/product-dialog.component.ts
import { Component, OnInit, Inject }          from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule  }                 from '@angular/material/form-field';
import { MatInputModule      }                 from '@angular/material/input';
import { MatSelectModule     }                 from '@angular/material/select';
import { MatButtonModule     }                 from '@angular/material/button';
import { ReactiveFormsModule }                 from '@angular/forms';
import { MatCheckboxModule }                   from '@angular/material/checkbox';
import { CommonModule        }                 from '@angular/common';

import { ApiService, Product, ProductRequest, Category } from '../../../core/api.service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-dialog.component.html',
  styles: [`
    .full-width { width: 100%; }
  `]
})
export class ProductDialogComponent implements OnInit {
  public form!: FormGroup;
  public categories: Category[] = [];  // ← lista de categorias

  constructor(
    private fb: FormBuilder,
    public  dialogRef: MatDialogRef<ProductDialogComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
  ) {}

  ngOnInit() {
    // monta o form
    this.form = this.fb.group({
      name:        [this.data?.name        ?? '', [Validators.required]],
      description: [this.data?.description ?? '', [Validators.required]],
      price:       [this.data?.price       ?? 0,  [Validators.required, Validators.min(0)]],
      categoryId:  [this.data?.categoryPath.id ?? null, [Validators.required]],
      available:   [this.data?.available   ?? true]
    });

    // carrega categorias
    this.api.getCategories().subscribe(list => this.categories = list);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload: ProductRequest = this.form.value;
    const op$ = this.data
      ? this.api.atualizarProduto(this.data.id, payload)
      : this.api.criarProduto(payload);

    op$.subscribe({
      next: prod => this.dialogRef.close(prod),
      error: ()   => this.form.setErrors({ invalid: true })
    });
  }
}