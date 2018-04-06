import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { NotificationsModel } from './notifications.model';
import { NotificationsService } from './notifications.service';
import { ProfileService } from '../profile/profile.service';

import { OtherUserDetailsPage } from '../other-user-details/other-user-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ProfilesModel } from '../profile/profile.model';


@Component({
  selector: 'notifications-page',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications: NotificationsModel = new NotificationsModel();
  loading: any;
  items: any;
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

  ionViewDidLoad() {
    this.loading.present();
    
    
      this.profileService.getData().then(user => {
        //console.log("->->-> "+user.companyid);

        this.notificationsService
        .getUsers()
        .then(data => {
           
                let activeUsers:any = [];
                this.profilesModel.users = JSON.parse(data['_body']); 
                  for(let p of this.profilesModel.users){
                        if(p.isfirstlogin==="false" && p.companyid===user.companyid){
                          //console.log("+>+>+> "+p.companyid);
                          let image;
                             if(p.imagepath!=null){
                               image = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+p.imagepath;
                             }else{
                               image = '../../assets/images/profile/emp2.png';
                             }
                             let user = {
                                displayname : p.displayname,
                                email : p.email,
                                department : p.department,
                                imagepath : image 
                              };
                              activeUsers.push(user);
                        }  
                  }
                  this.notifications.users = activeUsers;
                  this.items = activeUsers;
                  //alert(activeUsers);
          this.loading.dismiss();
        },(err) => {
          
        });
    
      });
  }
  filterItems(searchTerm){
    console.log(this.items);
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
      //alert(notification);

  }
}
