/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for app-theme-color such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AppThemeColorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppThemeColorProvider {

  constructor(public http: HttpClient,public storage: Storage) {
    console.log('Hello AppThemeColorProvider Provider');
  }
  setAppThemeColor(themeColor: string): void {
    this.storage.set('app-theme-color', themeColor);
  };

  async getAppThemeColor(): Promise<string> {
    return await this.storage.get('app-theme-color').then((value) => {
      return value;
    });
  };

}
