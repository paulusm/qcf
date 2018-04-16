/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to display options in tab navigation 
 * bar in main display screen(at bottom)
 * Values get set as this page renders
 * **************************************************************/


import { Component } from '@angular/core';

import { ListingPage } from '../listing/listing';
import { ProfilePage } from '../profile/profile';
import { OtherUsersPage } from '../other-users/other-users';
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
    this.tab4Root = OtherUsersPage;
    this.tab5Root = ActivitiesPage;

    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      
      if(value===null){
        this.tabColorTheme = 'tabs-nav4';
      }else if(value==='app-color-theme-1'){
        this.tabColorTheme = 'tabs-nav1';
      }else if(value==='app-color-theme-2'){
        this.tabColorTheme = 'tabs-nav2';
      }else if(value==='app-color-theme-3'){
        this.tabColorTheme = 'tabs-nav3';
      }else if(value==='app-color-theme-4'){
        this.tabColorTheme = 'tabs-nav4';
      }
    });

    







  }
}
