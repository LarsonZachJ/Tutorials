import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './edit/product-edit.component';

import { ProductService } from './product.service';
import { ProductEditGuard } from './edit/product-edit-guard.service';
import { ProductParamterService } from './product-paramter.service';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductShellDetailComponent } from './product-shell/product-shell-detail.component';
import { ProductShellListComponent } from './product-shell/product-shell-list.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductShellComponent },
      { path: ':id', component: ProductDetailComponent },
      {
        path: ':id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent,
      },
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductShellComponent,
    ProductShellDetailComponent,
    ProductShellListComponent,
  ],
  providers: [ProductService, ProductEditGuard, ProductParamterService],
})
export class ProductModule {}
