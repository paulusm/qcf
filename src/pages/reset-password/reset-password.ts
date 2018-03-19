import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  reset_password: FormGroup;
  email: string;
  loading: any;
  code:string;
  newpassword:string;
  contactemail:string;
  errortext:string;
  constructor(public navCtrl: NavController, public authService: AuthenticationProvider, 
    public loadingCtrl: LoadingController, public navParams:NavParams) {
        this.email = this.navParams.get('email');
        
        this.reset_password = new FormGroup({
          code: new FormControl('', Validators.required),
          newpassword: new FormControl('', Validators.required)
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  showLoader(){
        
    this.loading = this.loadingCtrl.create({
        content: 'Resetting...'
    });
    this.loading.present();

  }

  submitreset(){

        //var credentials
        this.showLoader();
        this.authService.resetpassword(this.reset_password.get('newpassword').value, this.reset_password.get('code').value).then((result) => {
            this.loading.dismiss();
            console.log('Result from server: ' + result);
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
