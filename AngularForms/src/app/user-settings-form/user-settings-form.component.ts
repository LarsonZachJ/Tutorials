import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: IUserSettings;
  userSettings: IUserSettings;

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);
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
    this.userSettings = { ...this.originalUserSettings };
  }

  constructor() {}
}
