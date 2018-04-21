/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying details of selected activity
 * Activity get render on page initiation.
 * User been given options to join this activity by choosing two of one ways.
 * Either Email to Owner's for voluntering or go to Owner's donation page for sponsorship.
 * These function have been used for these task:
 * doJoin()
 * openInAppBrowser()
 * sendMail()
 * **************************************************************/

import { Component } from '@angular/core';

import { NavController,  LoadingController,NavParams } from 'ionic-angular';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { ProfileService } from '../profile/profile.service';

import { Storage } from '@ionic/storage';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ActivitiesService } from '../activities/activities.service';

import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-join-activity',
  templateUrl: 'join-activity.html',
})
/**
 * Class representing Join Activity Page
 */
export class JoinActivityPage {
  main_page: { component: any };
  loading: any;
  item:any
  colorTheme: any;
  colorThemeHeader:any;

  v:boolean = false;
  s:boolean = false;
  owersEmail:any = "as_baig@yahoo.com";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public appThemeColorProvider:AppThemeColorProvider,
    public activitiesService:ActivitiesService,
    public profileService:ProfileService,
    private emailComposer: EmailComposer,
    public inAppBrowser: InAppBrowser,    
  ) {
    this.item = navParams.get("newItem");
    this.profileService.getUsers().then((data)=>{
      let users = JSON.parse(data['_body']); 
      for(let p of users){
            if(p._id===this.item.activityowner){
                this.owersEmail = p.email;
            }  
      }

    });
    
    if(this.item.activitytype.indexOf("Volunteering")!=-1){
          this.v = true;
    }
    if(this.item.activitytype.indexOf("Sponsorship")!=-1){
          this.s = true;
    }
    this.main_page = { component: TabsNavigationPage };

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
 * Method to open doner's website in app browser
 */
  openInAppBrowser(website: string){
    this.profileService.getData().then((data)=>{
      this.item.sponsors.push(data.email);
      
      this.activitiesService.updateActivityAsEmployee(this.item).then((result) => {
        this.inAppBrowser.create(website, '_blank', "location=yes");
        this.navCtrl.setRoot(TabsNavigationPage); 
      }, (err: any) => {
            alert(`status: ${err.status}, ${err.statusText}`);
      });
    });
  }
/**
 * Method to launch app to email for voluntering 
 */
  sendMail(){
    this.profileService.getData().then((data)=>{
      this.item.volunteers.push(data.email);
      
      this.activitiesService.updateActivityAsEmployee(this.item).then((result) => {
        let email = {
          to: this.owersEmail,
          subject: 'Voluntering for : ' + this.item.activityname,
          body: "Hello, I am writing this email to show my availability for this activity, Please contact me at this email address for futher communications."
        };
        // Send a text message using default options
        this.emailComposer.open(email);
        this.navCtrl.setRoot(TabsNavigationPage);
      }, (err: any) => {
            alert(`status: ${err.status}, ${err.statusText}`);
      });
    });
 }  

}
