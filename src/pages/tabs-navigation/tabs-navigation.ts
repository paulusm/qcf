import { Component } from '@angular/core';

import { ListingPage } from '../listing/listing';
import { ProfilePage } from '../profile/profile';
import { NotificationsPage } from '../notifications/notifications';
import { NewsPage } from '../news/news';
import { ActivitiesPage } from '../activities/activities';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;
  tabColorTheme: any;

  constructor(public appThemeColorProvider:AppThemeColorProvider) {
    this.tab1Root = ListingPage;
    this.tab2Root = ProfilePage;
    this.tab3Root = NewsPage;
    this.tab4Root = NotificationsPage;
    this.tab5Root = ActivitiesPage;

    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      //alert(value);
      if(value===null){
        this.tabColorTheme = 'tabs-nav1';
      }else if(value==='app-color-theme-1'){
        this.tabColorTheme = 'tabs-nav1';
      }else if(value==='app-color-theme-2'){
        this.tabColorTheme = 'tabs-nav2';
      }
      //alert(this.tabColorTheme);
    });
  }
}
