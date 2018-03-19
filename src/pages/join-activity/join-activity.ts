import { Component } from '@angular/core';
import { NavController,  LoadingController,NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';


import { Storage } from '@ionic/storage';


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
  //newitem:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
    this.item = navParams.get("newItem");
    this.main_page = { component: TabsNavigationPage };

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
