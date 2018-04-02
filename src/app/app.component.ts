import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController,LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
//import { FormsPage } from '../pages/forms/forms';
//import { NewsPage } from '../pages/news/news';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { ContactCardPage } from '../pages/contact-card/contact-card';
import { LoginPage } from '../pages/login/login';

import { AuthenticationProvider } from '../providers/authentication/authentication';

import { UserData} from '../providers/user-data/user-data';

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
  menuColor:any;

  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any,logsOut?: boolean}>;
  pushPages2: Array<{title: any, icon: string, component: any,logsOut?: boolean}>;

  constructor(
    public platform: Platform,
    public userData: UserData,
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
    //this.role =  false;
    
     this.storage.get('hasSeenWalkthrough')
      .then((hasSeenWalkthrough) => {
        if (hasSeenWalkthrough) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = WalkthroughPage;
        }
        this.platformReady()
      }); 
    //this.menuColor  = 'ion-menu-2';
    
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      //alert(value);
      if(value===null){
        this.menuColor = 'ion-menu-1';
      }else if(value==='app-color-theme-1'){
        this.menuColor = 'ion-menu-1';
      }else if(value==='app-color-theme-2'){
        this.menuColor = 'ion-menu-2';
      }else if(value==='app-color-theme-3'){
        this.menuColor = 'ion-menu-3';
      }
      //alert(this.menuColor);
    });
    




    //this.rootPage = TabsNavigationPage;
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsNavigationPage },
      //{ title: 'Forms', icon: 'create', component: FormsPage }
    ];

    this.pushPages = [
      { title: 'Edit Profile', icon: 'settings', component: EditProfilePage , logsOut: false},
      { title: 'Contact', icon: 'md-call',component: ContactCardPage , logsOut: false},
      { title: 'FAQ', icon: 'help', component: LoginPage, logsOut: false },
      { title: 'Logout', icon: 'log-out', component: LoginPage, logsOut: true }
    ];

    /* this.pushPages2 = [
      { title: 'Edit Admin Profile', icon: 'settings', component: EditProfilePage , logsOut: false},
      { title: 'Contact', icon: 'md-call',component: ContactCardPage , logsOut: false},
      { title: 'FAQ', icon: 'help', component: LoginPage, logsOut: false },
      { title: 'Logout', icon: 'log-out', component: LoginPage, logsOut: true }
    ]; */
    
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
    this.app.getRootNav().push(page.component);
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
