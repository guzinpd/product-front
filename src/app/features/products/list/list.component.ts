// src/app/features/products/list/list.component.ts
import { Component, OnInit, ViewChild }    from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { MatTableDataSource }               from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort }                          from '@angular/material/sort';
import { MatDialog, MatDialogModule }       from '@angular/material/dialog';
import { MatButtonModule }                  from '@angular/material/button';
import { MatFormFieldModule }               from '@angular/material/form-field';
import { MatInputModule }                   from '@angular/material/input';
import { MatCheckbox }                      from '@angular/material/checkbox';

import { MaterialModule }                   from '../../../shared/material/material.module';
import { ApiService, Product }              from '../../../core/api.service';
import { AuthService }                      from '../../../core/auth/auth.service';
import { ProductDialogComponent }           from '../product-dialog/product-dialog.component';
import { LoginAlertDialogComponent }        from '../../../core/auth/login-alert-dialog/login-alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckbox
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns = ['name','description','price','available','category','actions'];
  dataSource = new MatTableDataSource<Product>([]);
  filterValues = { name: '', description: '', price: '', available: '', category: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)      sort!: MatSort;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) => {
      const f = JSON.parse(filter);
      return data.name.toLowerCase().includes(f.name)
          && data.description.toLowerCase().includes(f.description)
          && data.price.toString().includes(f.price)
          && (f.available === '' || data.available.toString() === f.available)
          && data.categoryPath.name.toLowerCase().includes(f.category);
    };
    this.load();
  }

  load() {
    this.api.listarProdutos().subscribe(prods => {
      this.dataSource.data = prods;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  applyColumnFilter(column: keyof typeof this.filterValues, value: string) {
    this.filterValues[column] = value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
    this.paginator.firstPage();
  }

  openCreate() {
    if (!this.auth.isLoggedIn()) {
      this.dialog.open(LoginAlertDialogComponent, { width: '450px' });
      return;
    }
    const ref = this.dialog.open(ProductDialogComponent, { width: '400px', data: null });
    ref.afterClosed().subscribe(res => res && this.load());
  }

  openEdit(p: Product) {
    if (!this.auth.isLoggedIn()) {
      this.dialog.open(LoginAlertDialogComponent, { width: '450px' });
      return;
    }
    const ref = this.dialog.open(ProductDialogComponent, { width: '400px', data: p });
    ref.afterClosed().subscribe(res => res && this.load());
  }

  onDelete(id: number) {
    if (!this.auth.isLoggedIn()) {
      this.dialog.open(LoginAlertDialogComponent, { width: '300px' });
      return;
    }
    const data: ConfirmDialogData = {
      title: 'Excluir Produto',
      message: 'Deseja mesmo excluir este produto?',
      cancelText: 'Cancelar',
      confirmText: 'Excluir'
    };
    this.dialog.open(ConfirmDialogComponent, { width: '350px', data })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.api.deletarProduto(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
          });
        }
      });
  }
}