import { Product } from '@app/products';
import * as fromRoot from '@app/state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductAction, ProductActionTypes } from '@app/products/state/actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Array<Product>;
  error: string;
}

export interface State extends fromRoot.RootState {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: new Array<Product>(),
  error: ''
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

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state: ProductState, currentProductId: number) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
    }
  }
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
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
        currentProductId: null
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: new Array<Product>(),
        error: action.payload
      };
    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      return {
        ...state,
        currentProductId: action.payload.id,
        products: updatedProducts,
        error: ''
      };
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.CreateProductSuccess:
      const copyProducts = [...state.products];
      copyProducts.push(action.payload);
      return {
        ...state,
        error: '',
        products: copyProducts
      };
    case ProductActionTypes.CreateProductFail:
      return { ...state, error: action.payload };
    case ProductActionTypes.DeleteProductSuccess:
      const deleteCopy = state.products.filter(
        (p) => p.id !== state.currentProductId
      );
      return {
        ...state,
        error: '',
        products: deleteCopy
      };
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
