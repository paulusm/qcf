import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ResetPasswordPage } from '../reset-password/reset-password';

import { LoginPage } from '../login/login';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  main_page: { component: any };
  email: any;
  constructor(public nav: NavController,public authService:AuthenticationProvider) {
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
