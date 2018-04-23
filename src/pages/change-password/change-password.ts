/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for give functionality of 
 * changing password to user.
 * doConfirm() function call authentication service to change password. 
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { ProfileService } from '../profile/profile.service';

import { PasswordValidator } from '../../components/validators/password.validator';

import { UserModel } from '../profile/profile.model';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'change-password-page',
  templateUrl: 'change-password.html'
})
/**
 * Class representing Change Password Page
 */
export class ChangePasswordPage {
  main_page: { component: any };
  loading: any;
  profile: UserModel = new UserModel();
  FirstLoginWas:boolean;
  colorTheme: any;
  colorThemeHeader:any;

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param modal 
   * @param loadingCtrl 
   * @param authService 
   * @param profileService 
   * @param storage 
   * @param formBuilder 
   * @param appThemeColorProvider 
   */
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationProvider,
    public profileService: ProfileService,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
     this.main_page = { component: TabsNavigationPage };
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
  }
  /**
   * Default Method which will tigger before page load 
   */
  ionViewWillLoad() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group
    });

  }
  /**
   * Setting Validation messages
   */
  validation_messages = {
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ]
  };
  /**
   * Method used authService to change password
   */
  doConfirm(){
    this.profileService.getData()
      .then(data => {
        this.profile = data;
        if(this.profile.isfirstlogin==="true"){
          this.FirstLoginWas = true;
        }else if(this.profile.isfirstlogin==="false"){
          this.FirstLoginWas = false;
        }
    
                      let credentialsnew = {
                          email: this.profile.email,
                          password: this.validations_form.get('matching_passwords').get('password').value
                      };
    
                      console.log("Calling loginchangepassword service");
    
                      console.log(credentialsnew);
    
                      this.authService.changePassword(credentialsnew).then((result) => {
    
                          console.log("Logged in after password change");
                          console.log(result);
                          this.nav.insert(0,TabsNavigationPage);
                          this.nav.popToRoot();
    
                      }, (err) => {
                          console.log("Error in change password response");
                          console.log(err);
                          alert("Password change failed.\n Please Login again, and try again.");
                          this.nav.insert(0,LoginPage);
                          this.nav.popToRoot();
                      });
      });
  }
}
