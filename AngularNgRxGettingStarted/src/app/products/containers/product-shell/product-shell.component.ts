import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@app/products';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '@app/products/state';
import * as productActions from '@app/products/state/actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  componentActive = true;

  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Array<Product>>;
  selectedProduct$: Observable<Product>;

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }

  clearProduct(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(
      select(fromProduct.getCurrentProduct)
    );
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  constructor(private store: Store<fromProduct.State>) {}
}
