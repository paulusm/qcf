/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for give user functionality of 
 * creating new faq.
 * doCreateFAQ() function call faq service to create new faq.
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController,Platform,ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { ProfilePage } from '../profile/profile';
import { ProfileService } from '../profile/profile.service';
import { Storage } from '@ionic/storage';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { FAQService } from './faq.service';

@Component({
  selector: 'page-create-faq',
  templateUrl: 'create-faq.html',
})
/**
 * Class representing Create Faq Page
 */
export class CreateFaqPage {
  new_faq: FormGroup;
  main_page: { component: any };
  loading: any;
  image: any = null;

  colorTheme: any;
  colorThemeHeader:any;

  faq: any;
  
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public toastCtrl: ToastController,
    public storage: Storage,
    public platform: Platform,
    public appThemeColorProvider:AppThemeColorProvider,
    public faqService:FAQService
  ) {
    this.main_page = { component: TabsNavigationPage };

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

    this.new_faq = new FormGroup({
      faqtitle: new FormControl('', Validators.required),
      faq: new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {
  }
  /**
   * Method to create new FAQ  using faq Service
   */
  doCreateFAQ(){
    this.profileService.getData().then((data)=>{
          this.faq = {
            faqtitle: this.new_faq.get('faqtitle').value,
            faq: this.new_faq.get('faq').value,
            companyid: data.companyid
          };
          
          this.faqService.createFAQ(this.faq).then((result) => {
            this.nav.setRoot(ProfilePage);
            
          }, (err: any) => {
                alert(`status: ${err.status}, ${err.statusText}`);
          });
    });  
  }
}