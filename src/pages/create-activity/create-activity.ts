import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})

export class CreateActivityPage {
  new_activity: FormGroup;
  main_page: { component: any };
  loading: any;

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationProvider,
    public storage: Storage
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.new_activity = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      donationmatching: new FormControl(false),
      location: new FormControl(''),
      activity_type: new FormControl('sponsorship'),
      from_date: new FormControl('', Validators.required),
      from_time: new FormControl('', Validators.required),
      to_date: new FormControl(''),
      to_time: new FormControl(''),
      voluntering:new FormControl(false),
      sponsorship: new FormControl(false)
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  doCreateActivity(){

  }
  presentActionSheet(){
    alert("Coming soon...");
  }


}