/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to display details of selected activity
 * Activity get render on page initiation.
 * User been given option to approve this activity. 
 * This function have been used for this task:
 * approveActivity()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { ActivitiesService } from '../activities/activities.service';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
//import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-unapprove-activities-details',
  templateUrl: 'unapprove-activities-details.html',
})
/**
 * Class representing Unapprove Activities Details Page
 */
export class UnapproveActivitiesDetailsPage {
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
/**
 *  Method to approve activity
 */
   approveActivity(){
     this.item.approved = true;
    this.activitiesService.approveActivity(this.item).then((result) => {

      this.navCtrl.insert(0,TabsNavigationPage);
      this.navCtrl.popToRoot();

      
    }, (err: any) => {
          alert(`status: ${err.status}, ${err.statusText}`);
    });
   }
}
