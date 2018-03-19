import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { ProfileService } from '../profile/profile.service';


import { UserModel } from '../profile/profile.model';
@Component({
  selector: 'change-password-page',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  changePassword: FormGroup;
  main_page: { component: any };
  loading: any;
  profile: UserModel = new UserModel();

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationProvider,
    public profileService: ProfileService
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.changePassword = new FormGroup({
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });
  }

  doConfirm(){
    this.profileService.getData()
      .then(data => {
        this.profile = data;
        
        //this.loading.dismiss();
      });  
    let credentials = {
      email: this.profile.email,
      password: this.changePassword.get('new_password').value
  };
  //alert("doConfirm  "+credentials.email+" "+credentials.password);
   this.authService.changePassword(credentials).then(result => {
        this.nav.setRoot(this.main_page.component);

  }, (err: any) => {
      //this.loading.dismiss();
          alert(`status: ${err.status}, ${err.statusText}`);
    });

    //this.nav.setRoot(this.main_page.component);
  }
}
