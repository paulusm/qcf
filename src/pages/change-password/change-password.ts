import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { AuthenticationProvider } from '../../providers/authentication/authentication';

import { ProfileService } from '../profile/profile.service';


import { UserModel } from '../profile/profile.model';

import { Storage } from '@ionic/storage';


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
    public profileService: ProfileService, public storage: Storage
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.changePassword = new FormGroup({
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });
  }

  doConfirm(){
    //alert("in doConfirm... ");
    this.profileService.getData()
      .then(data => {
        this.profile = data;
        //alert("this.profile"+this.profile.email);
        //this.loading.dismiss();
       /*  let credentials = {
          email: this.profile.email,
          password: this.changePassword.get('new_password').value
        }; */
      //alert("credentials  "+credentials.email+" "+credentials.password);

      //Another call to the Auth provider....also handles response as success or error.
            console.log("Calling login service");
            //this.storage.set('token', '');
            //this.storage.remove('token'); 
            //this.authService.login(credentials).then((result) => {
                //this.loading.dismiss();
              //  console.log("Logged in using original password");
                //console.log(result);
                
                      let credentialsnew = {
                          email: this.profile.email,
                          password: this.changePassword.get('new_password').value
                      }; 
                      //alert("credentialsnew  "+credentialsnew.email+" "+credentialsnew.password);
                      console.log("Calling loginchangepassword service");
                      
                      console.log(credentialsnew);
                      
                      this.authService.changePassword(credentialsnew).then((result) => {

                         // this.loading.dismiss();
                          console.log("Logged in after password change");
                          console.log(result);
                      
                          this.nav.insert(0,TabsNavigationPage);
                          this.nav.popToRoot();

                      }, (err) => {

                          //this.loading.dismiss();
                      
                          console.log("Error in change password response");
                          console.log(err);
                      });
                //this.navCtrl.setRoot(HomePage);
            /* }, (err) => {
                //this.loading.dismiss();
                console.log(err);
            }); */
      });  
       
   

    
  }
}
