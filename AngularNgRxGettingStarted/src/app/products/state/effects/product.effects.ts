import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '@app/products/service';
import * as productActions from '@app/products/state/actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Product } from '@app/products';
import { of } from 'rxjs';
import { LoadFail } from '@app/products/state/actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) =>
      this.productService.getProducts().pipe(
        map(
          (products: Array<Product>) => new productActions.LoadSuccess(products)
        ),
        catchError((err) => of(new productActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    switchMap((action: productActions.UpdateProduct) => {
      return this.productService.updateProduct(action.payload).pipe(
        map(
          (product: Product) => new productActions.UpdateProductSuccess(product)
        ),
        catchError((err) => of(new productActions.UpdateProductFail(err)))
      );
    })
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    mergeMap((action: productActions.CreateProduct) =>
      this.productService.createProduct(action.payload).pipe(
        map(
          (product: Product) => new productActions.CreateProductSuccess(product)
        ),
        catchError((err) => of(new productActions.CreateProductFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    mergeMap((action: productActions.DeleteProduct) =>
      this.productService.deleteProduct(action.payload).pipe(
        map(() => {
          return new productActions.DeleteProductSuccess();
        }),
        catchError((err) => of(new productActions.DeleteProductFail(err)))
      )
    )
  );
}
