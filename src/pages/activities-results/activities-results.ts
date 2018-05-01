/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to displaying results of all closed 
 * activities.
 * Activities get render on page initiation in form of ionic list.
 * By tapping each List item user can go to details of particular  
 * activity.
 * These function have been used for these task:
 * goToActivitiesResultsDetail()
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ActivitiessModel } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';

import { ActivitiesResultsDetailPage } from '../activities-results-detail/activities-results-detail';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';


import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'page-activities-results',
  templateUrl: 'activities-results.html',
})
/**
  * Class representing Activities Results Page.
  */
export class ActivitiesResultsPage {

  activities: ActivitiessModel = new ActivitiessModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  noActivities:boolean=false;
  
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param activitiesService 
   * @param loadingCtrl 
   * @param appThemeColorProvider 
   * @param profileService 
   */
  constructor(
    public nav: NavController,
    public activitiesService: ActivitiesService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider,
    public profileService:ProfileService
  ) {

    this.loading = this.loadingCtrl.create();
    
     
  }
  /**
 * Default method tigger after this page load
 */
  ionViewWillEnter() {
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
/**
 *  Default method called just after view of this page loaded.
 */
  ionViewWillLoad() {
    this.loading.present();
    this.profileService.getData().then((user)=>{ 
          this.activitiesService
            .getAllActivities()
            .then(data => {
                if(JSON.parse(data['_body']).length===0){
                  this.noActivities=true;
                }  
              let  tempArray1 = JSON.parse(data['_body']);
              
              let tempArray2=[];
              for(let t of tempArray1){
                      //if(user.companyid===t.companyid && t.status[0]==="Closed"){
                            t.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+t.filename;
                            if(t.filename===null || t.filename===undefined || t.filename===""){
                              t.displayImage =  './assets/images/noimage.jpeg';
                            }
                            t.startdate = new Date(t.startdate);
                            t.enddate = new Date(t.enddate);
                            if(t.targethours===undefined){
                              t.targethours = 0;
                            }
                            if(t.targetamount===undefined){
                              t.targetamount=0; 
                            }
                            tempArray2.push(t);
                      //}
              }  
              console.log(tempArray2);

              this.activities.items = tempArray2;
              this.loading.dismiss();
          }); 
    });
  }
/**
 * Method use to navigate to ActivitiesResultsDetailPage with current activity as item
 */
goToActivitiesResultDetail(item:any){
    this.nav.push(ActivitiesResultsDetailPage, { newItem: item });
  }
}