/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to give user functionality of 
 * retrieve forgotten password by providing their email.
 * recoverPassword() function call authentication service for forgotten password. 
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ResetPasswordPage } from '../reset-password/reset-password';

import { LoginPage } from '../login/login';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
/**
 * Class representing Forgot Password Page
 */
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  main_page: { component: any };
  email: any;
  colorTheme: any;
  colorThemeHeader:any;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param authService 
   * @param appThemeColorProvider 
   */
  constructor(
    public nav: NavController,
    public authService:AuthenticationProvider,
    public appThemeColorProvider:AppThemeColorProvider) {
    
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

    this.main_page = { component: LoginPage };

    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ]
  };
/**
 * Method to recover forgotten password
 */
  recoverPassword(){

    let lcoontactemail = {
      email:this.forgot_password.get('email').value
    }
    this.authService.forgot(lcoontactemail).then((result) => {
      this.email = this.forgot_password.get('email').value;
      alert("Please follow instructions in email !!!");
      this.nav.push(ResetPasswordPage,this.email);
      
    }, (err) => {
      console.log(err);
    });
  }
}
