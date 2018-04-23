/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for give Business Admin functionality of 
 * adding new user with role either BusinessAdmin/Employee.
 * doAddUser() function call authentication service to create new user. 
 * **************************************************************/
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
/**
 *  Class represnting Add User page.
 */
export class AddUserPage {
  new_user: FormGroup;
  main_page: { component: any };
  loading: any;
  userModel:UserModel = new UserModel();
  companyId:string;

  colorTheme: any;
  colorThemeHeader:any;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param modal 
   * @param loadingCtrl 
   * @param authService 
   * @param storage 
   * @param profileService 
   * @param appThemeColorProvider 
   */
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationProvider,
    public storage: Storage,
    public profileService:ProfileService,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
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
    this.profileService.getData()
      .then(data => {
        this.userModel = data;
        this.companyId = this.userModel.companyid;
      });
    this.main_page = { component: TabsNavigationPage };

    this.new_user = new FormGroup({
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
    
  }
  /**
    * Method use to add new user in DB
    */
  doAddUser(){
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
    this.authService.createAccount(details).then((result) => {

      this.nav.pop();      
      
    }, (err: any) => {
          alert(`status: ${err.status}, ${err.statusText}`);
    });
  }

}
