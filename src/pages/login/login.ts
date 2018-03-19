import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
//import { ChangePasswordPage } from '../change-password/change-password';
import { Storage } from '@ionic/storage';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { UserModel } from '../../pages/profile/profile.model';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  firstLogin:any;
  userModel:UserModel = new UserModel();
  token: any;
  constructor(
    public nav: NavController,
    public storage:Storage,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationProvider
  ) {
    
    this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required//,
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        //Validators.minLength(5),
        Validators.required,
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ]
  };
  ionViewDidLoad() {

  }

  ionViewWillLoad() {
      this.showLoader();

     //Check if already authenticated
     this.authService.checkAuthentication().then((res) => {
         console.log("Already authorized");
         this.loading.dismiss();
         this.nav.setRoot(this.main_page.component);
         //this.navCtrl.setRoot(TabsPage);
     }, (err) => {
         console.log("Not already authorized");
         this.loading.dismiss();
     });  
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();

  }
  doLogin() {

      this.showLoader();

        let credentials = {
            email: this.login.get('email').value,
            password: this.login.get('password').value
        };
          
         this.authService.login(credentials).then(result => {
            this.loading.dismiss();
            
            this.token = result['token'];
           
            this.userModel.setUser(result['user']);

            this.storage.set('token', this.token);
            this.storage.set('userModel', this.userModel);
            
            /* if(result['user'].isfirstlogin==='true'){
                this.nav.setRoot(ChangePasswordPage);    
            }else{
                this.nav.setRoot(this.main_page.component);
            } */    
            this.nav.setRoot(this.main_page.component);

        }, (err: any) => {
            this.loading.dismiss();
                alert(`status: ${err.status}, ${err.statusText}`);
          });   
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
