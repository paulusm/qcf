import { Component } from '@angular/core';
import { MenuController, App, NavParams, LoadingController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AddUserPage } from '../add-user/add-user';
import { CreateActivityPage } from '../create-activity/create-activity';

import { UserModel } from './profile.model';
import { ProfileService } from './profile.service';

import { Storage } from '@ionic/storage';

import { ThemeProvider } from '../../providers/theme/theme';


import 'rxjs/Rx';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  display: string;
  profile: UserModel = new UserModel();
  loading: any;
  role: any;
  image: any;


  themes:any;

  value:boolean;
  groups:any;
  shownGroup:any = null;
  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public profileService: ProfileService,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public themeService:ThemeProvider
  ) {
    this.display = "list";

    this.loading = this.loadingCtrl.create();

        
    this.themeService.getThemes().then((res) => {
      this.groups = JSON.parse(res['_body']); 
        for(var i=0; i<this.groups.length;i++){
             if(this.groups[i].name==="Homelessness"){
                    this.groups[i].status = true;
             }else{
                    this.groups[i].status = false;
             } 

        }
        console.log("Right Here >>> "+this.groups);
        }, (err) => {
      
            this.loading.dismiss();
    });
        
  }

  ionViewDidLoad() {
   this.loading.present();
    //this.image = "../../assets/images/profile/emp1.png";
    this.image = "../../assets/images/profile/emp1.png";
    this.storage.get('profileImage').then((value) => {
      if(value){  
        this.image = value;
      }
      return value;
    }).catch(this.handleError);
    
    this.profileService.getData()
      .then(data => {
        this.profile = data;
        if(this.profile.role==="BusinessAdmin"){
          this.role=true;
        }else{
          this.role=false;
        }
        this.loading.dismiss();
      });
    

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }


  goToAddUser(){
    this.app.getRootNav().push(AddUserPage);
  }

  goToCreateActivity(){
    this.app.getRootNav().push(CreateActivityPage);

  }

  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(EditProfilePage);
  }
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  toggleGroup (group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  doLeaveTheme(){
    alert("Are you sure you want to leave this theme ?");
  }
  doJoinTheme(){
    alert("Are you sure you want to join this theme ?");
  }


}
