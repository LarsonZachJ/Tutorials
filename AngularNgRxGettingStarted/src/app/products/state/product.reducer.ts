import { Product } from '@app/products';
import { ProductAction, ProductActionTypes } from '@app/products/state/actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Array<Product>;
  error: string;
}
const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: new Array<Product>(),
  error: ''
};
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
