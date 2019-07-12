import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '@app/user';
import { UserActionTypes, UserAction } from '@app/user/state/actions';

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

export function UserReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return { ...state, maskUserName: action.payload };
    case UserActionTypes.LogIn:
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    default:
      return state;
  }
}
