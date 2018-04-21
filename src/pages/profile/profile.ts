/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to displaying details of logged-in user
 * User details get render on page initiation and activties this user have signed up.
 * User been given options to edit their profile,create new activity or update existing acitivty 
 * Business Admin user get extra options of approve activities and add new users.
 * These functions perform these tasks:
 * goToEditActivity()
 * goToApproveActivity()
 * goToAddUser()
 * goToCreateActivity()
 * goToEditProfile()
 ***************************************************************/


import { Component } from '@angular/core';
import { MenuController, App, NavParams, LoadingController, NavController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AddUserPage } from '../add-user/add-user';
import { CreateActivityPage } from '../create-activity/create-activity';
import { CreateFaqPage } from '../create-faq/create-faq';

import { EditActivityListPage } from '../edit-activity-list/edit-activity-list';
import { CloseActivityListPage } from '../close-activity-list/close-activity-list';

import { ActivitiesResultsPage } from '../activities-results/activities-results';

import { UnapproveActivitiesPage } from '../unapprove-activities/unapprove-activities';

import { ActivitiessModel } from '../activities/activities.model';
import { ActivitiesService } from '../activities/activities.service';

import { UserModel } from './profile.model';
import { ProfileService } from './profile.service';

import { Storage } from '@ionic/storage';

import { FilesProvider } from '../../providers/files/files';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import 'rxjs/Rx';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
/**
 * Class representing ProfilePage
 */
export class ProfilePage {
  profile: UserModel = new UserModel();
  activities: ActivitiessModel = new ActivitiessModel();
  loading: any;
  roleStatus:boolean=false;
  image = "./assets/images/emp.png";

  colorTheme: any;
  colorThemeHeader:any;

  noActivities:boolean=false;
  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProfileService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public files: FilesProvider,
    public appThemeColorProvider:AppThemeColorProvider,
    public nav:NavController,
    public activitiesService:ActivitiesService
  ) {
        this.loading = this.loadingCtrl.create({
          content: 'Loading profile...'
        });
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
   * Method tigger just after this page load 
   */
  ionViewWillLoad() {
    this.loading.present();
    this.image = "../../assets/images/profile/emp1.png";
   
    this.profileService.getUserImage().then((profileImg)=>{
      if(profileImg){
        this.image = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+profileImg;
        
      }
    });
    
        this.profileService.getData().then((user)=>{ 
                this.profile = user;
        if(this.profile.role==="Employee"){
                this.roleStatus=true;
        }
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
                        t.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+t.filename;
                        t.startdate = new Date(t.startdate);
                        t.enddate = new Date(t.enddate);
                        tempArray2.push(t);    
                    }/* else{
                        t.status = false;
                    } */
                    //
                    //tempArray2.push(t);
            }  
            this.activities.items = tempArray2;
        }); 
      }); 
      this.loading.dismiss();
  }
  /**
   * Method to navigate to EditActivityListPage
   */
  goToEditActivity(){
    this.nav.push(EditActivityListPage);
  }
    /**
   * Method to navigate to UnapproveActivitiesPage
   */
  goToApproveActivity(){
    this.nav.push(UnapproveActivitiesPage);
  }
    /**
   * Method to navigate to CloseActivityListPage
   */
  goToCloseActivity(){
    this.nav.push(CloseActivityListPage);
  }
    /**
   * Method to navigate to ActivitiesResultsPage
   */
  goToActivityResult(){
    this.nav.push(ActivitiesResultsPage);
  }
    /**
   * Method to navigate to AddUserPage
   */
  goToAddUser(){
    this.nav.push(AddUserPage);
  }
    /**
   * Method to navigate to CreateActivityPage
   */
  goToCreateActivity(){
    this.nav.push(CreateActivityPage);
  }
    /**
   * Method to navigate to EditProfilePage
   */
  goToEditProfile() {
    this.nav.push(EditProfilePage);
  }
    /**
   * Method to navigate to CreateFaqPage
   */
  goToFAQ(){
    this.nav.push(CreateFaqPage);
  }
  
}
