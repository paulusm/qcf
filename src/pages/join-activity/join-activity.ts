import { Component } from '@angular/core';
import { NavController,  LoadingController,NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { ProfileService } from '../profile/profile.service';

import { Storage } from '@ionic/storage';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ActivitiesService } from '../activities/activities.service';


@Component({
  selector: 'page-join-activity',
  templateUrl: 'join-activity.html',
})
export class JoinActivityPage {
  join_activity: FormGroup;
  main_page: { component: any };
  loading: any;
  /* item = {
      url:"../assets/images/1212.jpg",
      title:"Hello World!!"

  }; */
  item:any
  colorTheme: any;
  colorThemeHeader:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public appThemeColorProvider:AppThemeColorProvider,
    public activitiesService:ActivitiesService,
    public profileService:ProfileService
  ) {
    this.item = navParams.get("newItem");
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

    this.join_activity = new FormGroup({
       selected_option: new FormControl('voluntering')
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinActivityPage');
  }

  doJoin(){
    //alert("Activity Joined "+this.join_activity.get('selected_option').value);
    this.profileService.getData().then((data)=>{
      if(this.join_activity.get('selected_option').value==="voluntering"){
                this.item.volunteers.push(data.email);
      }else if(this.join_activity.get('selected_option').value==="sponsorship"){
                this.item.sponsors.push(data.email);
      }
      console.log(this.item);
      
      this.activitiesService.updateActivity(this.item).then((result) => {
        console.log(">>>>> "+JSON.stringify(result));  
         this.navCtrl.pop(); 
        //this.nav.push(ProfilePage);
        //this.nav.insert(0,EditProfilePage);
        //this.nav.popToRoot();
        
      }, (err: any) => {
            //this.loading.dismiss();
            alert(`status: ${err.status}, ${err.statusText}`);
      });

      //this.navCtrl.pop();

    });




    
  }
}
