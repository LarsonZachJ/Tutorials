import { Action } from '@ngrx/store';
import { User } from '@app/user';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name',
  LogIn = '[User] Login'
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;
  constructor(public payload: boolean) {}
}

export class Login implements Action {
  readonly type = UserActionTypes.LogIn;
  constructor(public payload: User) {}
}

export type UserAction = MaskUserName | Login;
