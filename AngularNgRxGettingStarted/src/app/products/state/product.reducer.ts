import { Product } from '@app/products';
import * as fromRoot from '@app/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductAction, ProductActionTypes } from '@app/products/state/actions';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Array<Product>;
}

export interface State extends fromRoot.RootState {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: new Array<Product>()
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

export function productReducer(
  state = initialState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          description: '',
          id: 0,
          productCode: 'New',
          productName: '',
          starRating: 0
        }
      };
    case ProductActionTypes.Load:
      return null;
    case ProductActionTypes.LoadSuccess:
      return null;
    case ProductActionTypes.LoadFail:
      return null;

    default:
      return state;
  }
}
