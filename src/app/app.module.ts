import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

//pages
import { ListingPage } from '../pages/listing/listing';
import { LoginPage } from '../pages/login/login';
import { OtherUsersPage } from '../pages/other-users/other-users';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { ContactCardPage } from '../pages/contact-card/contact-card';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { AddUserPage } from '../pages/add-user/add-user';
import { NewsPage } from '../pages/news/news';
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { ArticlesPage } from '../pages/articles/articles';
import { ArticleDetailsPage } from '../pages/article-details/article-details';
import { SuccessStoriesPage } from '../pages/success-stories/success-stories';
import { SuccessStoriesDetailsPage } from '../pages/success-stories-details/success-stories-details';
import { OtherUserDetailsPage } from '../pages/other-user-details/other-user-details';
import { ImageModelPage } from '../pages/image-model/image-model';
import { ActivitiesPage } from '../pages/activities/activities';
import { CreateActivityPage } from '../pages/create-activity/create-activity';
import { JoinActivityPage } from '../pages/join-activity/join-activity';
import { AppColorThemePage } from '../pages/app-color-theme/app-color-theme';
import { CreateFaqPage } from '../pages/create-faq/create-faq';
import { FaqsPage } from '../pages/faqs/faqs';
import { EditFaqPage } from '../pages/edit-faq/edit-faq';
import { ActivitiesDetailsPage } from '../pages/activities-details/activities-details';
import { EditActivityListPage } from '../pages/edit-activity-list/edit-activity-list';
import { EditActivityDetailPage } from '../pages/edit-activity-detail/edit-activity-detail';
import { ActivitiesResultsPage } from '../pages/activities-results/activities-results';
import { ActivitiesResultsDetailPage } from '../pages/activities-results-detail/activities-results-detail';
import { CloseActivityListPage } from '../pages/close-activity-list/close-activity-list';
import { CloseActivityDetailPage } from '../pages/close-activity-detail/close-activity-detail';
import { UnapproveActivitiesPage } from '../pages/unapprove-activities/unapprove-activities';
import { UnapproveActivitiesDetailsPage } from '../pages/unapprove-activities-details/unapprove-activities-details';

//custom components
import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { ValidatorsModule } from '../components/validators/validators.module';

//services
import { ProfileService } from '../pages/profile/profile.service';
import { NotificationsService } from '../pages/other-users/other-users.service';
import { NewsService } from '../pages/news/news.service';
import { ArticlesService } from '../pages/articles/articles.service';
import { ActivitiesService } from '../pages/activities/activities.service';
import { FAQService } from '../pages/create-faq/faq.service';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ThemeProvider } from '../providers/theme/theme';
import { FilesProvider } from '../providers/files/files';
import { CompanyProvider } from '../providers/company/company';
import { AppThemeColorProvider } from '../providers/app-theme-color/app-theme-color';
import { SuccessStoriesService } from '../pages/success-stories/success-stories.service';

// Ionic Native Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppRate } from '@ionic-native/app-rate';
import { Crop } from '@ionic-native/crop';
import { EmailComposer } from '@ionic-native/email-composer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    LoginPage,
    OtherUsersPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    EditProfilePage,
    ChangePasswordPage,
    AddUserPage,
    ForgotPasswordPage,
    ResetPasswordPage,AppColorThemePage,

    TermsOfServicePage,
    PrivacyPolicyPage,
    NewsPage,ArticlesPage,SuccessStoriesPage,
    NewsDetailsPage,ArticleDetailsPage,SuccessStoriesDetailsPage,
    OtherUserDetailsPage,
    ActivitiesPage,
    ActivitiesDetailsPage,
    CreateActivityPage,
    JoinActivityPage,

    EditActivityListPage,
    EditActivityDetailPage,

    CloseActivityListPage,
    CloseActivityDetailPage,

    ActivitiesResultsPage,
    ActivitiesResultsDetailPage,

    UnapproveActivitiesPage,
    UnapproveActivitiesDetailsPage,
    ContactCardPage,
    ImageModelPage,

    CreateFaqPage,
    FaqsPage,
    EditFaqPage,

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
    ArticlesPage,SuccessStoriesPage,
    LoginPage,
    OtherUsersPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    EditProfilePage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ChangePasswordPage,
    AddUserPage,AppColorThemePage,
    ArticleDetailsPage,
    
    TermsOfServicePage,
    PrivacyPolicyPage,
    ContactCardPage,
    NewsPage,
    NewsDetailsPage,
    SuccessStoriesDetailsPage,
    OtherUserDetailsPage,
    ActivitiesPage,
    ActivitiesDetailsPage,
    CreateActivityPage,
    JoinActivityPage,
    EditActivityListPage,
    EditActivityDetailPage,
    CloseActivityListPage,
    CloseActivityDetailPage,
    ActivitiesResultsPage,
    ActivitiesResultsDetailPage,
    
    CreateFaqPage,
    FaqsPage,
    EditFaqPage,
    
    UnapproveActivitiesPage,
    UnapproveActivitiesDetailsPage,
    ImageModelPage

  ],
  providers: [
    ProfileService,
    NotificationsService,
    NewsService,
    ArticlesService,
    SuccessStoriesService,
    ActivitiesService,
    FAQService,
    
	  SplashScreen,
	  StatusBar,
    SocialSharing,
    NativeStorage,
    InAppBrowser,
		AppRate,
		Crop,
    EmailComposer,
    AuthenticationProvider,
    Camera,
    FilePath,
    FileTransfer,
    FileTransferObject,
    File,
    ThemeProvider,
    FilesProvider,
    CompanyProvider,
    AppThemeColorProvider,
    LaunchNavigator
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
