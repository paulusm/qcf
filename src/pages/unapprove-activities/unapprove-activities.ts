/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to display all unapproved activities
 * offering by that particular company to whom this logged-in admin user belong.
 * Activities get render on page initiation in form of ionic list.
 * By sliding left to each List item user can go to approve particular  
 * activity
 * This function have been used :
 * goToUnapprovedActivitiesDetail()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ActivitiessModel } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ProfileService } from '../profile/profile.service';

import { UnapproveActivitiesDetailsPage } from '../unapprove-activities-details/unapprove-activities-details';

@Component({
  selector: 'page-unapprove-activities',
  templateUrl: 'unapprove-activities.html',
})
/**
 * Class representing Unapprove Activities Page
 */
export class UnapproveActivitiesPage {

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
 * Method tigger just before this page load 
 */
  ionViewDidLoad() {
    this.loading.present();
    this.profileService.getData().then((user)=>{ 
          this.activitiesService
            .getUnapprovedActivities()
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
                      if(t.targethours===undefined){
                        t.targethours = 0;
                      }
                      if(t.targetamount===undefined){
                         t.targetamount=0; 
                      }
                      tempArray2.push(t);
              }  


              this.activities.items = tempArray2;
              this.loading.dismiss();
          }); 
    });
  }
/**
 * Method to navigate to approved actinits
 */
  goToUnapprovedActivitiesDetail(item:any){
    this.nav.push(UnapproveActivitiesDetailsPage, { newItem: item });
  }
  }