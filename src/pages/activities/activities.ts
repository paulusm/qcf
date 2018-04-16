/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying all approved activities
 * offering by that particular company to whom this logged-in user belong.
 * Activities get render on page initiation in form of ionic list.
 * By sliding left to each List item user can go to details of particular  
 * activity,join that activity or navigate to given address.
 * These function have been used for these task:
 * goToActivitiesDetail()
 * goToJoinActivity()
 * goToNavigateActivity()
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ActivitiessModel } from './activities.model';
import { ActivitiesService } from './activities.service';

import { ActivitiesDetailsPage } from '../activities-details/activities-details';
import { JoinActivityPage } from '../join-activity/join-activity';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

  activities: ActivitiessModel = new ActivitiessModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  noActivities:boolean=false;
  

  constructor(
    public nav: NavController,
    public activitiesService: ActivitiesService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider,
    private launchNavigator: LaunchNavigator,
    public profileService:ProfileService
  ) {

    this.loading = this.loadingCtrl.create();
    
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
    this.loading.present();
    this.profileService.getData().then((user)=>{ 
          this.activitiesService
            .getActivities()
            .then(data => {
                if(JSON.parse(data['_body']).length===0){
                  this.noActivities=true;
                }  
              let  tempArray1 = JSON.parse(data['_body']);
              let tempArray2=[];
              for(let t of tempArray1){
                      if(t.sponsors.indexOf(user.email)!= -1 || t.volunteers.indexOf(user.email)!= -1){
                          
                          t.status = true;

                      }else{
                          t.status = false;
                      }
                      t.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+t.filename;
                      t.startdate = new Date(t.startdate);
                      t.enddate = new Date(t.enddate);
                      tempArray2.push(t);
              }  


              this.activities.items = tempArray2;
              this.loading.dismiss();
          }); 
    });
  }
  goToActivitiesDetail(item:any){
    this.nav.push(ActivitiesDetailsPage, { newItem: item });
  }
  goToJoinActivity(item:any){
    this.nav.push(JoinActivityPage, { newItem: item });
  }
  goToNavigateActivity(item){
    let options: LaunchNavigatorOptions = {
      start: ""
    };

    this.launchNavigator.navigate(item.address, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    ); 

  }

}