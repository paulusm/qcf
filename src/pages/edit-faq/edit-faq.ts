/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying & editing details 
 * of selected FAQ.
 * FAQ details get render on page initiation.
 * User can replace or fill in new information and update them. 
 * This function have been used for this task:
 * saveChanges()
 ***************************************************************/

import { NavController,LoadingController, Platform ,NavParams,ToastController} from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { FAQModel } from '../create-faq/faq.model';
import { FAQService } from '../create-faq/faq.service';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import 'rxjs/Rx';

@Component({
  selector: 'page-edit-faq',
  templateUrl: 'edit-faq.html',
})
/**
 * Class representing Edit Faq Page
 */
export class EditFaqPage {
  editForm: FormGroup;
  rootPage: any = TabsNavigationPage;
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  roleStatus:boolean=false;
  item:any;
  faqModel: FAQModel = new FAQModel();

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param loadingCtrl 
   * @param fAQService 
   * @param navParams 
   * @param platform 
   * @param toastCtrl 
   * @param storage 
   * @param http 
   * @param appThemeColorProvider 
   */
  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public fAQService: FAQService,
    public navParams: NavParams,
    public platform: Platform,
    public toastCtrl: ToastController,
    public storage: Storage,
    public http:Http,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.item = navParams.get("faq");
    
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

    this.loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
    
    this.editForm = new FormGroup({
      faqtitle: new FormControl(),
      faq: new FormControl()
    });
  }
/**
 * Method tigger just before this page load
 */
  ionViewWillLoad() {
    
    this.loading.present();
    this.editForm.patchValue({
      faqtitle: this.item.faqtitle,
      faq: this.item.faq
    });
    this.loading.dismiss();
  }
  /**
   * Method to saving changes in current FAQ using FAQ Service
   */
  saveChanges(){
    this.faqModel._id = this.item._id;
    this.faqModel.companyid = this.item.companyid;
    this.faqModel.faqtitle = this.editForm.get('faqtitle').value;
    this.faqModel.faq = this.editForm.get('faq').value;

    this.fAQService.updateFAQ(this.faqModel).then((result) => {
      console.log(result['_body']);
      console.log("FAQ updated...");
      this.nav.insert(0,TabsNavigationPage);
      this.nav.popToRoot();

    }, (err: any) => {
          this.loading.dismiss();
          alert(`status: ${err.status}, ${err.statusText}`);
    });

  }
}
