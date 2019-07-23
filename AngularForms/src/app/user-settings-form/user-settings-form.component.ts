import { Component, OnInit } from '@angular/core';
import { IUserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: IUserSettings;
  userSettings: IUserSettings;

  ngOnInit(): void {
    this.originalUserSettings = {
      name: 'Milton',
      emailOffers: true,
      interfaceStyle: 'dark',
      subscriptionType: 'Annual',
      notes: 'here are some notes...',
    };
    this.userSettings = { ...this.originalUserSettings };
  }

  constructor() {}
}
