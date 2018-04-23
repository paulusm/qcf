/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to displaying details of selected activity
 * Activity get render on page initiation.
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { ActivitiesService } from '../activities/activities.service';

@Component({
  selector: 'page-activities-results-detail',
  templateUrl: 'activities-results-detail.html',
})
/**
  * Class representing Activities Results Detail Page.
  */
export class ActivitiesResultsDetailPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param navCtrl 
   * @param navParams 
   * @param appThemeColorProvider 
   * @param activitiesService 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appThemeColorProvider:AppThemeColorProvider,
    public activitiesService:ActivitiesService
  ) {
    this.item = navParams.get("newItem");
    
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

}
