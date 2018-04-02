import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
//import { Validators, FormGroup, FormControl } from '@angular/forms';
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
export class ChangePasswordPage {
  //changePassword: FormGroup;
  main_page: { component: any };
  loading: any;
  profile: UserModel = new UserModel();
  FirstLoginWas:boolean;
  colorTheme: any;
  colorThemeHeader:any;

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;

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
  }
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
    
                         // this.loading.dismiss();
                          console.log("Logged in after password change");
                          console.log(result);
                          if(this.FirstLoginWas){
                              alert("Password changed successfully\n Please go to Edit Profile under Profile page to complete your registration.");
                          }
                          this.nav.insert(0,TabsNavigationPage);
                          this.nav.popToRoot();
    
                      }, (err) => {
    
                          //this.loading.dismiss();
    
                          console.log("Error in change password response");
                          console.log(err);
                          alert("Password change failed.\n Please Login again, and try again.");
                          this.nav.insert(0,LoginPage);
                          this.nav.popToRoot();
    
    
                      });
      });

  }
}
