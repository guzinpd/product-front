// features/products/products.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ListComponent
  ]
})
export class ProductsModule {}
