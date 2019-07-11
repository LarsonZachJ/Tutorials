import { Product } from '@app/products';
import * as fromRoot from '@app/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

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
  products: []
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

export function productReducer(state = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}
