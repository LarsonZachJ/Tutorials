import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '@app/user/service';
import { Store, select } from '@ngrx/store';

import * as fromUser from '@app/user/state';
import * as fromRoot from '@app/state';
import * as userActions from '@app/user/state/actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new userActions.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromUser.getMaskUserName),
        takeWhile(() => this.componentActive)
      )
      .subscribe((maskUserName) => {
        this.maskUserName = maskUserName;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  constructor(
    private store: Store<fromRoot.RootState>,
    private authService: AuthService,
    private router: Router
  ) {}
}
