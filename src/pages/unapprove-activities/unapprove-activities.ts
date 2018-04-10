import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ActivitiessModel } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';

//import { ActivitiesDetailsPage } from '../activities-details/activities-details';
//import { JoinActivityPage } from '../join-activity/join-activity';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

//import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { ProfileService } from '../profile/profile.service';

import { UnapproveActivitiesDetailsPage } from '../unapprove-activities-details/unapprove-activities-details';

@Component({
  selector: 'page-unapprove-activities',
  templateUrl: 'unapprove-activities.html',
})
export class UnapproveActivitiesPage {

  activities: ActivitiessModel = new ActivitiessModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  /* start:any;
  destination:any; */
  

  constructor(
    public nav: NavController,
    public activitiesService: ActivitiesService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider,
    //private launchNavigator: LaunchNavigator,
    public profileService:ProfileService
  ) {
  
    //this.start = "";
    //this.destination = "Westminster, London, UK";

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
      //alert(this.colorThemeHeader);
    }); 
  }

  ionViewDidLoad() {
    this.loading.present();
    this.profileService.getData().then((user)=>{ 
          console.log(user);  
          this.activitiesService
            .getUnapprovedActivities()
            .then(data => {
                //console.log(data['_body']);
              let  tempArray1 = JSON.parse(data['_body']);
              let tempArray2=[];
              for(let t of tempArray1){
                //console.log(t.sponsors);
                //console.log(t.volunteers);
                      //console.log((t.sponsors.indexOf(user.email)) + " - " + (t.volunteers.indexOf(user.email)));  
                      /* if(t.sponsors.indexOf(user.email)!= -1 || t.volunteers.indexOf(user.email)!= -1){
                          
                          t.status = true;

                      }else{
                          t.status = false;
                      } */
                      t.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+t.filename;
                      tempArray2.push(t);
              }  


              this.activities.items = tempArray2;//JSON.parse(data['_body']);
              //console.log(data['_body']);
              console.log(this.activities.items);
              this.loading.dismiss();
          }); 
    });
  }
  goToUnapprovedActivitiesDetail(item:any){
    //alert(item.title);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>"+JSON.stringify(item));
    this.nav.push(UnapproveActivitiesDetailsPage, { newItem: item });
  }
  /* goToJoinActivity(item:any){
    this.nav.push(JoinActivityPage, { newItem: item });
    //alert(item.url);
  }
  goToNavigateActivity(item){
    let options: LaunchNavigatorOptions = {
      start: this.start
    };

    this.launchNavigator.navigate(this.destination, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    ); 

  } */

}