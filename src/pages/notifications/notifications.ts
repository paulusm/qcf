import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { NotificationsModel } from './notifications.model';
import { NotificationsService } from './notifications.service';

import { OtherUserDetailsPage } from '../other-user-details/other-user-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';



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

  constructor(
    public nav: NavController,
    public notificationsService: NotificationsService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.loading = this.loadingCtrl.create();
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
  }

  ionViewDidLoad() {
    this.loading.present();
    this.notificationsService
      .getData()
      .then(data => {
        this.notifications.users = data.users;
        this.items = this.notifications.users;

        console.log(this.notifications.users);
        this.loading.dismiss();
      });
  }
  filterItems(searchTerm){
 
    return this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
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
