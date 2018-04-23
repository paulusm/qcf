/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to give functionality of 
 * reset forgetton password by providing given code in email. 
 * submitreset() function call authentication service to reset password. 
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
/**
 * Class representing ResetPasswordPage
 */
export class ResetPasswordPage {
  reset_password: FormGroup;
  email: string;
  loading: any;
  code:string;
  newpassword:string;
  contactemail:string;
  errortext:string;

  colorTheme: any;
  colorThemeHeader:any;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param navCtrl 
   * @param authService 
   * @param loadingCtrl 
   * @param navParams 
   * @param appThemeColorProvider 
   */
  constructor(public navCtrl: NavController, public authService: AuthenticationProvider, 
    public loadingCtrl: LoadingController, public navParams:NavParams,
    public appThemeColorProvider:AppThemeColorProvider) {
      this.email = this.navParams.get('email');
      
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


        this.reset_password = new FormGroup({
          code: new FormControl('', Validators.required),
          newpassword: new FormControl('', Validators.required)
        });

  }

  ionViewDidLoad() {
  }
/**
 * Method to show resetting model 
 */
  showLoader(){
        
    this.loading = this.loadingCtrl.create({
        content: 'Resetting...'
    });
    this.loading.present();

  }
/**
 * Method to reset change password
 */
  submitreset(){

        
        this.showLoader();
        this.authService.resetpassword(this.reset_password.get('newpassword').value, this.reset_password.get('code').value).then((result) => {
            this.loading.dismiss();
            if(JSON.stringify(result).indexOf('Password reset token is invalid or has expired') !== -1)
            {
                  this.errortext = JSON.stringify(result);
            }else{
                  this.navCtrl.setRoot(LoginPage);
            }
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
            this.errortext = err;
            this.navCtrl.setRoot(LoginPage);
        });
  }

}
