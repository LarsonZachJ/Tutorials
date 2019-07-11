import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import {
  ProductShellComponent,
  ProductListComponent,
  ProductEditComponent
} from '@app/products';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { productReducer } from '@app/products/state';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '@app/products/state/effects';

const productRoutes: Routes = [{ path: '', component: ProductShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  declarations: [
    ProductShellComponent,
    ProductListComponent,
    ProductEditComponent
  ]
})
export class ProductModule {}
