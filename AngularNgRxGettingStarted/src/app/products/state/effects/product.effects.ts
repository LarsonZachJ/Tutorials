import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '@app/products/service';
import * as productActions from '@app/products/state/actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
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
}
