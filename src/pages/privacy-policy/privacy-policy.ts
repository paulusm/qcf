import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'privacy-policy-page',
  templateUrl: 'privacy-policy.html'
})

export class PrivacyPolicyPage {

  colorTheme: any;
  colorThemeHeader:any;

  constructor(public view: ViewController,
    public appThemeColorProvider:AppThemeColorProvider) 
    {
      this.appThemeColorProvider.getAppThemeColor().then((value)=>{
        if(value===null){
          this.colorTheme = 'app-color-theme-3';
          this.colorThemeHeader = 'ion-header-3';
        }else if(value==='app-color-theme-1'){
          this.colorTheme = 'app-color-theme-1';
          this.colorThemeHeader = 'ion-header-1';
        }else if(value==='app-color-theme-2'){
          this.colorTheme = 'app-color-theme-2';
          this.colorThemeHeader = 'ion-header-2';
        }else if(value==='app-color-theme-3'){
          this.colorTheme = 'app-color-theme-3';
          this.colorThemeHeader = 'ion-header-3';
        }
      });

    }

  dismiss() {
    this.view.dismiss();
  }
}
