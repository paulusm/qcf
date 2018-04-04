import { Component } from '@angular/core';
import { NavController,  LoadingController,NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';


import { Storage } from '@ionic/storage';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';


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
    public appThemeColorProvider:AppThemeColorProvider
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
    //alert("Activity Joined "+this.join_activity.get('selected_option').value,);
    this.navCtrl.pop();
  }
}
