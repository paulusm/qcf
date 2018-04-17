/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for app-theme-color such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CompanyModel,CompanyProvider } from '../../providers/company/company';

/*
  Generated class for the AppThemeColorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppThemeColorProvider {
  companyModel: CompanyModel =new CompanyModel();
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public companyService: CompanyProvider
  ) {
    this.companyService.getCompany().then((value) => {

      this.companyModel = value;
      
    });
    
  }
  setAppThemeColor(themeColor: string): void {
    this.storage.set('app-theme-color', themeColor);
    this.companyModel.colourtheme = themeColor;
    this.companyService.updateCompany(this.companyModel).then(data => {
          this.companyModel = data['company'];
          this.companyService.setCompany(this.companyModel);
    });
    
  }

  setAppThemeColorLocally(themeColor: string): void {
    this.storage.set('app-theme-color', themeColor);
  }

  async getAppThemeColor(): Promise<string> {
    return await this.storage.get('app-theme-color').then((value) => {
      return value;
    });
  }

}
