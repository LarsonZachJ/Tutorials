import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: IUserSettings;
  userSettings: IUserSettings;
  postError: boolean = false;
  postErrorMessage: string = '';
  subscriptionTypes$: Observable<Array<string>>;

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
    if (form.valid) {
      this._dataService
        .postUserSettingsForm(this.userSettings)
        .subscribe(
          result => console.log('success: ', result),
          error => this.onHttpError(error)
        );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onBlur(field: NgModel) {
    console.log('in onBlur ', field.valid);
  }

  ngOnInit(): void {
    this.originalUserSettings = {
      name: null,
      emailOffers: null,
      interfaceStyle: null,
      subscriptionType: null,
      notes: null,
    };
    this.subscriptionTypes$ = this._dataService.getSubscriptionTypes();
    this.userSettings = { ...this.originalUserSettings };
  }

  constructor(private _dataService: DataService) {}
}
