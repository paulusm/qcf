/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to displaying all Users
 * particularly those who belong to logged-in user company.
 * Users get render on page initiation in form of ionic list.
 * By sliding left to each List item user can go to details of particular  
 * User. User can also filter Other-users by using given search bar .
 * These function have been used for these task:
 * goToUserDetail()
 * setFilteredItems()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { NotificationsModel} from './other-users.model';
import { NotificationsService } from './other-users.service';
import { ProfileService } from '../profile/profile.service';

import { OtherUserDetailsPage } from '../other-user-details/other-user-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ProfilesModel } from '../profile/profile.model';


@Component({
  selector: 'other-users-page',
  templateUrl: 'other-users.html'
})
export class OtherUsersPage {
  notifications: NotificationsModel = new NotificationsModel();
  loading: any;
  items: any=[];
  searchTerm: string = '';
  colorTheme: any;
  colorThemeHeader:any;

  profilesModel: ProfilesModel = new ProfilesModel();

  constructor(
    public nav: NavController,
    public notificationsService: NotificationsService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider,
    public profileService: ProfileService
  ) {
    this.loading = this.loadingCtrl.create();
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
  }

  ionViewWillLoad() {
    this.loading.present();
      this.profileService.getData().then(user => {
        this.notificationsService
        .getUsers()
        .then(data => {
           
                this.profilesModel.users = JSON.parse(data['_body']); 
                  for(let p of this.profilesModel.users){
                        if(p.isfirstlogin==="false" && p.companyid===user.companyid){
                          let image;
                             if(p.imagepath!=null){
                               image = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+p.imagepath;
                             }else{
                               image = './assets/images/profile/emp2.png';
                             }
                             let user = {
                                displayname : p.displayname,
                                email : p.email,
                                department : p.department,
                                imagepath : p.imagepath,
                                jobtitle: p.jobtitle,
                                about : p.about,
                                role : p.role,
                                companyid: p.companyid,
                                forename: p.forename,
                                surname: p.surename,
                                displayImage: image

                              };
                              this.notifications.users.push(user);
                              this.items.push(user);
                        }  
                  }
          this.loading.dismiss();
        },(err) => {
          
        });
    
      });
  }
  filterItems(searchTerm){
    return this.items.filter((item) => {
        return item.displayname.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }
  setFilteredItems() {
     this.notifications.users = this.filterItems(this.searchTerm);
  }

  goToUserDetail(notification){
    this.nav.push(OtherUserDetailsPage, { newItem: notification });
  }
}
