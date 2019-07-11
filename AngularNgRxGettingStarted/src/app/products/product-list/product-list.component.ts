import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '@app/products';
import { ProductService } from '@app/products/service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '@app/products/state';

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
  sub: Subscription;

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.selectedProduct = selectedProduct)
    );

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) {}
}
