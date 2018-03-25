import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
/**
 * Generated class for the AppColorThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-color-theme',
  templateUrl: 'app-color-theme.html',
})
export class AppColorThemePage {

  colorTheme: any;
  colorThemeHeader:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public appThemeColorProvider:AppThemeColorProvider) {

    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppColorThemePage');
  }
  onChangeTheme1(){

    this.appThemeColorProvider.setAppThemeColor('app-color-theme-1');
    this.navCtrl.setRoot(TabsNavigationPage);
  }
  onChangeTheme2(){

    this.appThemeColorProvider.setAppThemeColor('app-color-theme-2');
    this.navCtrl.setRoot(TabsNavigationPage);
  }
}
