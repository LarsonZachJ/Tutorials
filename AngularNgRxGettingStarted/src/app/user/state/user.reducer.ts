import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '@app/user';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: false,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export function UserReducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return { ...state, maskUserName: action.payload };
    default:
      return state;
  }
}
