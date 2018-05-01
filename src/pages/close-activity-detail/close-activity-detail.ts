/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying details of selected close-activity
 * Activity get render on page initiation.
 * User can fill in required information and update them. 
 * This function have been used for this task:
 * doUpdateActivity()
 ***************************************************************/

import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController,Platform,ToastController,ActionSheetController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Validators,FormGroup, FormControl } from '@angular/forms';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileService } from '../profile/profile.service';
//import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { Storage } from '@ionic/storage';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ActivitiesService } from '../activities/activities.service';

import { FilesProvider } from '../../providers/files/files';

import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-close-activity-detail',
  templateUrl: 'close-activity-detail.html',
})
/**
 * Class representing Close Activity Detail Page
 */
export class CloseActivityDetailPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;
  new_activity:any;
  image: any;
  vol: boolean=false;
  spon: boolean=false;
  activity: any;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param navCtrl 
   * @param files 
   * @param modal 
   * @param loadingCtrl 
   * @param profileService 
   * @param authService 
   * @param toastCtrl 
   * @param storage 
   * @param actionSheetCtrl 
   * @param platform 
   * @param appThemeColorProvider 
   * @param activitiesService 
   * @param navParams 
   * @param socialSharing 
   */
  constructor(
    public navCtrl: NavController, 
    public files: FilesProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public authService: AuthenticationProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public actionSheetCtrl:ActionSheetController,
    public platform: Platform,
    public appThemeColorProvider:AppThemeColorProvider,
    public activitiesService:ActivitiesService,
    public navParams: NavParams,
    public socialSharing: SocialSharing
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
      
    this.new_activity = new FormGroup({
      feedback: new FormControl('', Validators.required),
      totalhours:new FormControl(0,Validators.required),
      totalamount: new FormControl(0,Validators.required)
    });
  }

  ionViewDidLoad() {
  }
 /**
  * Method use activities Service to update closing details of acitivity
  */
  doUpdateActivity(){
          this.activity = {
            _id: this.item._id,
            activityname: this.item.activityname,
            activitydescription: this.item.activitydescription,
            activityowner: this.item.activityowner,
            companyid: this.item.companyid,
            enddate: this.item.enddate,
            startdate: this.item.startdate,
            mydonateurl: this.item.mydonateurl,
            donationmatch: this.item.donationmatch,
            activitytype: this.item.activitytype,
            approved: true,//this.item.approved,
            address: this.item.address,
            filename: this.item.filename,
            targethours:this.item.targethours,
            targetamount:this.item.targetamount,
            totalhours:this.new_activity.get('totalhours').value,
            totalamount:this.new_activity.get('totalamount').value,
            feedback:this.new_activity.get('feedback').value,
            status:['Closed']
          };
          
          this.activitiesService.updateActivity(this.activity).then((result) => {
 
            this.navCtrl.insert(0,MyApp);
            //this.navCtrl.insert(0,TabsNavigationPage);
            this.navCtrl.popToRoot();

            
          }, (err: any) => {
                alert(`status: ${err.status}, ${err.statusText}`);
          });
   }
}
