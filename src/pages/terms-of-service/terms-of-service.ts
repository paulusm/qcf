/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to give users terms of service of this app.
 * **************************************************************/
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'terms-of-service-page',
  templateUrl: 'terms-of-service.html'
})
/**
 * Class representing Terms Of Service Page
 */
export class TermsOfServicePage {

  colorTheme: any;
  colorThemeHeader:any;

  constructor(public view: ViewController,
    public appThemeColorProvider:AppThemeColorProvider) {
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-4';
        this.colorThemeHeader = 'ion-header-4';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
      }else if(value==='app-color-theme-3'){
        this.colorTheme = 'app-color-theme-3';
        this.colorThemeHeader = 'ion-header-3';
      }else if(value==='app-color-theme-4'){
        this.colorTheme = 'app-color-theme-4';
        this.colorThemeHeader = 'ion-header-4';
      }
    });

  }
/**
 * Method to dismiss this model
 */
  dismiss() {
    this.view.dismiss();
  }
}
