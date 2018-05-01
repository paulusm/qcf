/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to display options in tab navigation 
 * bar in main display screen(at bottom)
 * Values get set as this page renders
 * **************************************************************/


import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
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
/**
 * Class representing Tabs Navigatio nPage
 */
export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;
  tabColorTheme: any;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param appThemeColorProvider 
   */
  constructor(public appThemeColorProvider:AppThemeColorProvider,public events:Events) {
    this.tab1Root = ListingPage;
    this.tab2Root = ProfilePage;
    this.tab3Root = NewsPage;
    this.tab4Root = OtherUsersPage;
    this.tab5Root = ActivitiesPage;

    /**
     * Initializing color-theme for app's tabs
     */
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      
      if(value===null || value===undefined){
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
    this.listenToLoginEvents();
  }
  /**
    * Default method tigger after this page load
    */
   ionViewWillEnter() {
    this.tab1Root = ListingPage;
    this.tab2Root = ProfilePage;
    this.tab3Root = NewsPage;
    this.tab4Root = OtherUsersPage;
    this.tab5Root = ActivitiesPage; 
  }
  listenToLoginEvents() {
    this.events.subscribe('app-color-theme-1', () => {
      console.log("Event heard for tab 1");
      this.tabColorTheme = 'tabs-nav1';
    });
    this.events.subscribe('app-color-theme-2', () => {
      console.log("Event heard for tab 2");
      this.tabColorTheme = 'tabs-nav2';
    });
    this.events.subscribe('app-color-theme-3', () => {
      console.log("Event heard for tab 3");
      this.tabColorTheme = 'tabs-nav3';
    });
    this.events.subscribe('app-color-theme-4', () => {
      console.log("Event heard for tab 4");
      this.tabColorTheme = 'tabs-nav4';
    });
  }
}
