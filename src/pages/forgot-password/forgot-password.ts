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
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  main_page: { component: any };
  email: any;
  colorTheme: any;
  colorThemeHeader:any;

  constructor(public nav: NavController,public authService:AuthenticationProvider,
    public appThemeColorProvider:AppThemeColorProvider) {
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
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
  recoverPassword(){

    console.log(this.forgot_password.get('email').value);
    let lcoontactemail = {
      email:this.forgot_password.get('email').value
    }
    this.authService.forgot(lcoontactemail).then((result) => {
      //this.loading.dismiss();
      console.log('Result from server' + result);
      this.email = this.forgot_password.get('email').value;
      alert("Please follow instructions in email !!!");
      this.nav.push(ResetPasswordPage,this.email);
      
    }, (err) => {
      //this.loading.dismiss();
      console.log(err);
    });
    
    
  }

}
