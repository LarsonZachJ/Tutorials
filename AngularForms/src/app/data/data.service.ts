import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserSettings } from './user-settings';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  postUserSettingsForm(userSettings: IUserSettings): Observable<any> {
    return this._http.post<any>(
      'https://putsreq.com/hBtxpg0XWDSuTk3TNrM0',
      userSettings
    );
  }

  public getSubscriptionTypes(): Observable<Array<string>> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }

  constructor(private _http: HttpClient) {}
}
