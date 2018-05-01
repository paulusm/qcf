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
 * Class for the AppThemeColorProvider provider.
 */
@Injectable()
export class AppThemeColorProvider {
  companyModel: CompanyModel =new CompanyModel();
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public companyService: CompanyProvider
  ) {
    

      
      
    
    
  }
  /**
   * Method to set color theme for app in database
   * @param themeColor 
   */
  setAppThemeColor(themeColor: string): void {
    this.storage.set('app-theme-color', themeColor);
    this.companyService.getCompany().then((value) => {
          this.companyModel = value;
          this.companyModel.colourtheme = themeColor;
          this.companyService.updateCompany(this.companyModel).then(data => {
                this.companyModel = data['company'];
                this.companyService.setCompany(this.companyModel);
          });
    });
  }
/**
 * Method to set color theme in local storegae
 * @param themeColor 
 */
  setAppThemeColorLocally(themeColor: string): void {
    this.storage.set('app-theme-color', themeColor);
  }
  /**
   * Method to get color theme from local storage
   */
  async getAppThemeColor(): Promise<string> {
    return await this.storage.get('app-theme-color').then((value) => {
      return value;
    });
  }

}
