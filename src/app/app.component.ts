/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is entry point for this app any variables set
 * at this page will be global for whole app.
 * This page set values for side menu,set initial color theme for app
 * and set event handlers which would be globally available
 * **************************************************************/
import { Component, ViewChild } from '@angular/core';
import { Events, Platform, MenuController, Nav, App, ToastController,LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { ContactCardPage } from '../pages/contact-card/contact-card';
import { LoginPage } from '../pages/login/login';
import { FaqsPage } from '../pages/faqs/faqs';

import { AuthenticationProvider } from '../providers/authentication/authentication';

import { AppThemeColorProvider } from '../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  textDir: string = "ltr";
  loading: any;
  menuColor: any;
  hithere:any = "Hello";
  //menuImage: any;

  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any,logsOut?: boolean}>;
  pushPages2: Array<{title: any, icon: string, component: any,logsOut?: boolean}>;

  constructor(
    public events: Events,
    public platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthenticationProvider,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
     this.storage.get('hasSeenWalkthrough')
      .then((hasSeenWalkthrough) => {
        if (hasSeenWalkthrough) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = WalkthroughPage;
        }
        this.platformReady()
      }); 
    
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.menuColor = 'ion-menu-4';
      }else if(value==='app-color-theme-1'){
        this.menuColor = 'ion-menu-1';
      }else if(value==='app-color-theme-2'){
        this.menuColor = 'ion-menu-2';
      }else if(value==='app-color-theme-3'){
        this.menuColor = 'ion-menu-3';
      }else if(value==='app-color-theme-4'){
        this.menuColor = 'ion-menu-4';
      }
    });
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsNavigationPage },
    ];

    this.pushPages = [
      { title: 'Edit Profile', icon: 'settings', component: EditProfilePage , logsOut: false},
      { title: 'Contact', icon: 'md-call',component: ContactCardPage , logsOut: false},
      { title: 'FAQ', icon: 'help', component: FaqsPage, logsOut: false },
      { title: 'User Guide', icon: 'clipboard', component: WalkthroughPage, logsOut: false },
      { title: 'Logout', icon: 'log-out', component: LoginPage, logsOut: true }
    ];

    this.listenToLoginEvents();
    
  }

  openPage(page) {
    
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
        content: 'Logging Out...'
    });

    this.loading.present();

}
  pushPage(page) {
    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.showLoader();
        this.authService.logout();
        this.nav.setRoot(LoginPage);
      this.loading.dismiss();

    }
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.nav.push(page.component);
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
  listenToLoginEvents() {
    this.events.subscribe('app-color-theme-1', () => {
      this.menuColor = 'ion-menu-1';
    });
    this.events.subscribe('app-color-theme-2', () => {
      this.menuColor = 'ion-menu-2';
    });
    this.events.subscribe('app-color-theme-3', () => {
      this.menuColor = 'ion-menu-3';
    });
    this.events.subscribe('app-color-theme-4', () => {
      this.menuColor = 'ion-menu-4';
    });
  }
}
