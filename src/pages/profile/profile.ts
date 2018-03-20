import { Component } from '@angular/core';
import { MenuController, App, NavParams, LoadingController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AddUserPage } from '../add-user/add-user';
import { CreateActivityPage } from '../create-activity/create-activity';

import { UserModel } from './profile.model';
import { ProfileService } from './profile.service';

import { Storage } from '@ionic/storage';

import { FilesProvider } from '../../providers/files/files';

import 'rxjs/Rx';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profile: UserModel = new UserModel();
  loading: any;
  role: any;
  image: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProfileService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public files: FilesProvider
  ) {
        this.loading = this.loadingCtrl.create({
          content: 'Loading profile...'
        });
  }

  ionViewDidLoad() {
    this.loading.present();
    this.image = "../../assets/images/profile/emp1.png";
   
    this.profileService.getUserImage().then((profileImg)=>{
      if(profileImg){
        this.image = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+profileImg;
        console.log(this.image);
      }
    });
    
    this.profileService.getData()
      .then(data => {
        this.profile = data;
        if(this.profile.role==="BusinessAdmin"){
          this.role=true;
        }else{
          this.role=false;
        }
      });
      this.loading.dismiss();
  }

  /* private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  } */


  goToAddUser(){
    this.app.getRootNav().push(AddUserPage);
  }

  goToCreateActivity(){
    this.app.getRootNav().push(CreateActivityPage);

  }

  goToEditProfile() {
    this.app.getRootNav().push(EditProfilePage);
  }
  
}
