import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '@app/products';
import { ProductService } from '@app/products/service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '@app/products/state';
import * as productActions from '@app/products/state/actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products$: Observable<Array<Product>>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    // TODO: Unsubscribe
    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe((showDisplayCode) => {
        this.displayCode = showDisplayCode;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}
}
