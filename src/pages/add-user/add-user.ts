import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileService } from '../profile/profile.service';
import { UserModel } from '../../pages/profile/profile.model';

import { Storage } from '@ionic/storage';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {
  new_user: FormGroup;
  main_page: { component: any };
  loading: any;
  userModel:UserModel = new UserModel();
  companyId:string;

  colorTheme: any;
  colorThemeHeader:any;

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationProvider,
    public storage: Storage,
    public profileService:ProfileService,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-3';
        this.colorThemeHeader = 'ion-header-3';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
      }else if(value==='app-color-theme-3'){
        this.colorTheme = 'app-color-theme-3';
        this.colorThemeHeader = 'ion-header-3';
      }
    });
    this.profileService.getData()
      .then(data => {
        this.userModel = data;
        this.companyId = this.userModel.companyid;
      });
    this.main_page = { component: TabsNavigationPage };

    this.new_user = new FormGroup({
      //email: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      selected_option: new FormControl('Employee')
    });

  }
  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  doAddUser(){
    /* let image:any; 
    //this.nav.setRoot(this.main_page.component);
    this.storage.get('profileImage').then((value) => {
      image = value;
      return value;
    }) */
    let details = {
      email: this.new_user.get('email').value,
      role: this.new_user.get('selected_option').value,
      password: "Abc123",
      forename:"",
      surname:"",
      department:"",
      companyid:this.companyId,
      displayname:"",
      isfirstlogin:"true",
      imagepath: ""
    };
    alert(details.role+" "+details.email+" "+details.password);
    this.authService.createAccount(details).then((result) => {
      //this.loading.dismiss();
      console.log("doAddUser-->"+result);

      //this.firstLogin=false;

      this.nav.pop();      
        //this.nav.setRoot(this.main_page.component);
      
    }, (err: any) => {
      //this.loading.dismiss();
          alert(`status: ${err.status}, ${err.statusText}`);
    });
  }

}
