import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '@app/products';
import { ProductService } from '@app/products/service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '@app/products/state';
import * as productActions from '@app/products/state/actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

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
    this.store
      .pipe(select(fromProduct.getCurrentProduct))
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.productService
      .getProducts()
      .subscribe(
        (products: Product[]) => (this.products = products),
        (err: any) => (this.errorMessage = err.error)
      );

    // TODO: Unsubscribe
    this.store
      .pipe(select(fromProduct.getShowProductCode))
      .subscribe((showDisplayCode) => {
        this.displayCode = showDisplayCode;
      });
  }

  ngOnDestroy(): void {}

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}
}
