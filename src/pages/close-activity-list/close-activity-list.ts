/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying all activities
 * introduced by logged-in user to close.
 * Activities get render on page initiation in form of ionic list.
 * By tapping to each List item user can edit that particular  
 * activity.
 * These function have been used for these task:
 * goToUsersActivitiesDetail()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ActivitiessModel } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';


import { ProfileService } from '../profile/profile.service';

import { CloseActivityDetailPage } from '../close-activity-detail/close-activity-detail';

@Component({
  selector: 'page-close-activity-list',
  templateUrl: 'close-activity-list.html',
})
/**
 * Class representing Close Activity List Page
 */
export class CloseActivityListPage {

  activities: ActivitiessModel = new ActivitiessModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  noActivities:boolean = false;
  
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
   * Default method tigger just after page load using activities Service to get user's activities
   */
  ionViewDidLoad() {
    this.loading.present();
    this.profileService.getData().then((user)=>{ 
          this.activitiesService
            .getOwnersActivities()
            .then(data => {
                if(JSON.parse(data['_body']).length===0){
                  this.noActivities=true;
                }
              let  tempArray1 = JSON.parse(data['_body']);
              let tempArray2=[];
              for(let t of tempArray1){
                      t.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+t.filename;
                      if(t.filename===null || t.filename===undefined || t.filename===""){
                        t.displayImage =  './assets/images/noimage.jpeg';
                      }
                      t.startdate = new Date(t.startdate);
                      t.enddate = new Date(t.enddate);
                      let today = new Date();
                      if(t.targethours===undefined){
                        t.targethours = 0;
                      }
                      if(t.targetamount===undefined){
                         t.targetamount=0; 
                      }
                      if(t.enddate < today && t.status[0]==='Open'){
                              tempArray2.push(t);
                      }
                      
                      
              }  


              this.activities.items = tempArray2;
              this.loading.dismiss();
          }); 
    });
  }
/**
 * Method to navigate User Activities detail with current activity details
 */
  goToUsersActivitiesDetail(item:any){
    this.nav.push(CloseActivityDetailPage, { newItem: item });
  }

}