import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//pages
import { ListingPage } from '../pages/listing/listing';
import { FeedPage } from '../pages/feed/feed';
//import { FormsPage } from '../pages/forms/forms';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';

import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';


//import { FormLayoutPage } from '../pages/form-layout/form-layout';
//import { FiltersPage } from '../pages/filters/filters';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
//import { FormValidationsPage } from '../pages/form-validations/form-validations';

import { ContactCardPage } from '../pages/contact-card/contact-card';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { AddUserPage } from '../pages/add-user/add-user';
import { NewsPage } from '../pages/news/news';
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { OtherUserDetailsPage } from '../pages/other-user-details/other-user-details';

//custom components
import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { ValidatorsModule } from '../components/validators/validators.module';

//services
import { FeedService } from '../pages/feed/feed.service';
import { ListingService } from '../pages/listing/listing.service';
import { ProfileService } from '../pages/profile/profile.service';
import { NotificationsService } from '../pages/notifications/notifications.service';


import { NewsService } from '../pages/news/news.service';

import { ActivitiesPage } from '../pages/activities/activities';
import { ActivitiesService } from '../pages/activities/activities.service';
import { CreateActivityPage } from '../pages/create-activity/create-activity';
import { JoinActivityPage } from '../pages/join-activity/join-activity';
import { AppColorThemePage } from '../pages/app-color-theme/app-color-theme';

import { ActivitiesDetailsPage } from '../pages/activities-details/activities-details';

// Ionic Native Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { Keyboard } from '@ionic-native/keyboard';
import { AppRate } from '@ionic-native/app-rate';
//import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { EmailComposer } from '@ionic-native/email-composer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


import { UserData} from '../providers/user-data/user-data';
import { AuthenticationProvider } from '../providers/authentication/authentication';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ThemeProvider } from '../providers/theme/theme';
import { FilesProvider } from '../providers/files/files';
import { CompanyProvider } from '../providers/company/company';
import { AppThemeColorProvider } from '../providers/app-theme-color/app-theme-color';

@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    FeedPage,
  //  FormsPage,
    LoginPage,
    NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    EditProfilePage,
    ChangePasswordPage,
    AddUserPage,
    ForgotPasswordPage,
    ResetPasswordPage,AppColorThemePage,

    //FormLayoutPage,
    //FiltersPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    NewsPage,
    NewsDetailsPage,
    OtherUserDetailsPage,
    ActivitiesPage,
    ActivitiesDetailsPage,
    CreateActivityPage,
    JoinActivityPage,

    //functionalities
    ContactCardPage,
		//FormValidationsPage,

    //custom components
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
			modalEnter: 'modal-slide-in',
			modalLeave: 'modal-slide-out',
			pageTransition: 'ios-transition',
			swipeBackEnabled: false
    }),
    IonicStorageModule.forRoot(),
		ValidatorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListingPage,
    FeedPage,
    //FormsPage,
    LoginPage,
    NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    EditProfilePage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ChangePasswordPage,
    AddUserPage,AppColorThemePage,

    //FormLayoutPage,
    //FiltersPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    ContactCardPage,
    //FormValidationsPage,
    NewsPage,
    NewsDetailsPage,
    OtherUserDetailsPage,
    ActivitiesPage,
    ActivitiesDetailsPage,
    CreateActivityPage,
    JoinActivityPage
    

  ],
  providers: [
    FeedService,
    ListingService,
    ProfileService,
    NotificationsService,
    NewsService,
    ActivitiesService,

	  SplashScreen,
	  StatusBar,
    SocialSharing,
    NativeStorage,
    InAppBrowser,
    //Keyboard,
		AppRate,
		//ImagePicker,
		Crop,
    EmailComposer,
    UserData,
    AuthenticationProvider,
    Camera,
    FilePath,
    FileTransfer,
    //FileUploadOptions,
    FileTransferObject,
    File,
    ThemeProvider,
    FilesProvider,
    CompanyProvider,
    AppThemeColorProvider,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
