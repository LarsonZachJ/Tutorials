import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from '@app/user';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { UserReducer } from '@app/user/state';

const userRoutes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', UserReducer)
  ],
  declarations: [LoginComponent]
})
export class UserModule {}
