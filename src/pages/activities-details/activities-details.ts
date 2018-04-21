/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying details of selected activity
 * Activity get render on page initiation.
 * User been given options to like this activity or join this activity. 
 * These function have been used for these task:
 * joinActivity()
 * likeActivities()
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { JoinActivityPage } from '../join-activity/join-activity';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { ProfileService } from '../profile/profile.service';
import { UserModel } from '../profile/profile.model';
import { ActivitiesService } from '../activities/activities.service';

@Component({
  selector: 'page-activities-details',
  templateUrl: 'activities-details.html',
})
/**
  * Class representing Activities Details Page.
  */
export class ActivitiesDetailsPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;
  isLiked:boolean = false;
  userModel:UserModel = new UserModel();
  countLike:number=0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public socialSharing: SocialSharing,
    public appThemeColorProvider:AppThemeColorProvider,
    public profileService:ProfileService,
    public activitiesService:ActivitiesService
  ) {
    this.item = navParams.get("newItem");
    this.countLike = this.item.likes.length;
    /**
    * 
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

    this.profileService.getData()
      .then(data => {
        this.userModel = data;
        
        if(this.item.likes.indexOf(this.userModel.email) !== -1){
            this.isLiked = true;
        }
      
      });
  }

  ionViewDidLoad() {
    
  }

/**
  * Method use to navigate to JoinActivityPage with current activity as item
  */
  joinActivity(){
    this.navCtrl.push(JoinActivityPage, { newItem: this.item });
  }
/**
  * Method used to update number of likes for current activity
  */
  likeActivities(){
    
     if(this.isLiked){
      var index = this.item.likes.indexOf(this.userModel.email);    // <-- Not supported in <IE9
      if (index !== -1) {
        this.item.likes.splice(index, 1);
      }

      this.activitiesService.updateActivityAsEmployee(this.item).then((result) => {
        this.countLike--;
      }, (err: any) => {
            alert(`status: ${err.status}, ${err.statusText}`);
      });
      
     }else{
        this.item.likes.push(this.userModel.email);
        this.activitiesService.updateActivityAsEmployee(this.item).then((result) => {
          this.countLike++;
        }, (err: any) => {
              alert(`status: ${err.status}, ${err.statusText}`);
        });
     }
     this.isLiked= !this.isLiked;    
  }
}
