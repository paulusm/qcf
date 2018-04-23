/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying all News published by QCF.
 * News get render on page initiation in form of ionic list.
 * By sliding left to each List item user can go to details of particular  
 * News. User can also filter News by using given search bar .
 * These function have been used for these task:
 * goToNewsDetail()
 * setFilteredItems()
 * **************************************************************/
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { FAQsModel } from '../create-faq/faq.model';
import { FAQService } from '../create-faq/faq.service';

import { ProfileService } from '../profile/profile.service';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { EditFaqPage } from '../edit-faq/edit-faq';


@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
/**
 * Class representing Faqs Page
 */
export class FaqsPage {

  faqs: FAQsModel = new FAQsModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  shownGroup:any = null;
  roleStatus:boolean = false;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param fAQService 
   * @param profileService 
   * @param loadingCtrl 
   * @param appThemeColorProvider 
   */
  constructor(
    public nav: NavController,
    public fAQService: FAQService,
    public profileService:ProfileService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.loading = this.loadingCtrl.create();
    
    /**
     * Initializing color-theme for app's header navbar,menu and tabs
     */
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
/**
 * Default method tigger just after this page load 
 */
  ionViewWillLoad() {
    this.loading.present();
    this.profileService.getData().then((user)=>{ 
      if(user.role==="Employee"){
        this.roleStatus = true;
      }
      this.fAQService.getFAQs().then(data => {
              
              let companyFAQs:any = [];
              this.faqs.items = JSON.parse(data['_body']);
              for(let n of this.faqs.items){
                if(n.companyid===user.companyid){
                    companyFAQs.push(n);
                  }
              }
              this.faqs.items = companyFAQs;
              this.loading.dismiss();
      },(err) => {
      });
    });  
  }
/**
 * Method toggle themes
 */
  toggleGroup (group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
 /**
 * Method to show hidden group of areas under each theme
 */
  isGroupShown(group) {
    return this.shownGroup === group;
  }
/**
 * Method to navigate to EditFaqPage with current faq
 */
  doEditFAQ(fq){
    this.nav.push(EditFaqPage, { faq: fq });
  }
}