import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';



@IonicPage()
@Component({
  selector: 'page-other-user-details',
  templateUrl: 'other-user-details.html',
})
export class OtherUserDetailsPage {
  item: any;
  colorTheme: any;
  colorThemeHeader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appThemeColorProvider:AppThemeColorProvider) {

    this.item = navParams.get("newItem");
    
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserDetailsPage');
  }

}
