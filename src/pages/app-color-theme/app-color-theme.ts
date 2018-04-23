/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to give Business Admin options to choose 
 * pre-fixed app color theme. 
 * These function call AppThemeColorProvider service to achieve required tasks:
 * onChangeTheme1()
 * onChangeTheme2()
 * onChangeTheme3()
 * onChangeTheme4()
 * **************************************************************/

import { Component } from '@angular/core';
import { Events,  NavController, NavParams } from 'ionic-angular';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

@Component({
  selector: 'page-app-color-theme',
  templateUrl: 'app-color-theme.html',
})
/**
 * Class representing App Color Theme Page
 */
export class AppColorThemePage {

  colorTheme: any;
  colorThemeHeader:any;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param events 
   * @param navCtrl 
   * @param navParams 
   * @param appThemeColorProvider 
   */
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams,public appThemeColorProvider:AppThemeColorProvider) {
    /**
     * Initializing color-theme for app's header navbar,menu and tabs
     */
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

  ionViewDidLoad() {
  }
  /**
    * Method call to set new app color theme  'app-color-theme-1'
    */
  onChangeTheme1(){
    this.events.publish('app-color-theme-1');
    this.appThemeColorProvider.setAppThemeColor('app-color-theme-1');
    this.navCtrl.setRoot(TabsNavigationPage);
  }
  /**
    * Method call to set new app color theme  'app-color-theme-2'    
    */
  onChangeTheme2(){
    this.events.publish('app-color-theme-2');
    this.appThemeColorProvider.setAppThemeColor('app-color-theme-2');
    this.navCtrl.setRoot(TabsNavigationPage);
  }
  /**
    * * Method call to set new app color theme  'app-color-theme-3'
    */
  onChangeTheme3(){
    this.events.publish('app-color-theme-3');
    this.appThemeColorProvider.setAppThemeColor('app-color-theme-3');
    this.navCtrl.setRoot(TabsNavigationPage);
  }
  /**
    * * Method call to set new app color theme  'app-color-theme-4' 
    */
  onChangeTheme4(){
    this.events.publish('app-color-theme-4');
    this.appThemeColorProvider.setAppThemeColor('app-color-theme-4');
    this.navCtrl.setRoot(TabsNavigationPage);
  }
}
