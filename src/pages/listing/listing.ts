/****************************************************************
 * Created By: Muhammad Asim Baig
 * This is main(home) page where user land after logging-in,
 * Gives options to navigate to Success stories and Articles. 
 * It also display Charity themes and differentiate chosen themes by company with different colors.
 * Business Admin can choose or leave charity theme.
 * These function have been used for these task:
 * goToStoryOrArticle()
 * doLeaveTheme()
 * doJoinTheme()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController  } from 'ionic-angular';

import { ArticlesPage } from '../articles/articles';
import { SuccessStoriesPage } from '../success-stories/success-stories';

import { ThemeProvider } from '../../providers/theme/theme';
import { CompanyModel,CompanyProvider } from '../../providers/company/company';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { ProfileService } from '../profile/profile.service';
import { UserModel } from '../profile/profile.model';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import 'rxjs/Rx';

@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
/**
 * Class representing Listing Page
 */
export class ListingPage {
  companyModel: CompanyModel =new CompanyModel();
  profile: UserModel = new UserModel();
  roleStatus:boolean = false;
  categories: any;

  loading: any;
  companyLogo:any;
  themes:any;
  companyThemes:any;
  
  value:boolean;
  groups:any=[];
  shownGroup:any = null;
  colorTheme: any;
  colorThemeHeader:any;
  companyName:any;
  companyImage:any;

  joinedThemes:any =[];

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param loadingCtrl 
   * @param themeService 
   * @param companyService 
   * @param appThemeColorProvider 
   * @param profileService 
   * @param alertCtrl 
   */
  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public themeService:ThemeProvider,
    public companyService: CompanyProvider,
    public appThemeColorProvider:AppThemeColorProvider,
    public profileService:ProfileService,
    public alertCtrl: AlertController
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
 * Method tigger just after this page load
 */
  ionViewWillLoad() {
    this.loading.present();

    this.profileService.getData()
    .then(data => {
      this.profile = data;
      if(this.profile.role==="Employee"){
            this.roleStatus=true;
      }
        this.companyService.getCompany().then((value) => {

        this.companyModel = value;
        
        this.companyLogo = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+this.companyModel.filename;
        this.companyThemes = this.companyModel.themes;
        this.companyName = this.companyModel.companyname;
        this.companyImage = this.companyModel.filename;

        this.themeService.getThemes().then((res) => {
          this.groups = JSON.parse(res['_body']); 
                for(var i=0; i<this.groups.length;i++){
                  let found="false";
                    for(let theme of this.companyThemes){
                        if(this.groups[i].name === theme){
                                found = "true";
                        } 
                    }
                    if(found==="true"){
                      this.groups[i].status = true;
                      this.joinedThemes.push(this.groups[i]);
                    }else{
                      this.groups[i].status = false;  
                    }
                }
                if(this.roleStatus===true){
                  this.groups = this.joinedThemes;
                }
            }, (err) => {
                this.loading.dismiss();
        });

      });
    });
    this.categories =[
      {
          "title": "Stories",
          "image": "./assets/images/listing/200x200basquet.png"
      },
      {
          "title": "Articles",
          "image": "./assets/images/listing/200x200boxeo.png"
      }
    ];
    this.loading.dismiss();
  
  }
/**
 * Method to navigate to articles and stories
 */
  goToStoryOrArticle(category: any) {

    if(category.title==="Articles"){
      this.nav.push(ArticlesPage);
    }else if(category.title==="Stories"){
      this.nav.push(SuccessStoriesPage);
    }  
  }

 /**
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  toggleGroup (group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }
/**
 * Method to show hidden group of themmes
 */
  isGroupShown(group) {
    return this.shownGroup === group;
  }
/**
 * Method to Leave currently theme
 */
  doLeaveTheme(name){
    if(confirm("Leave this theme ?")){
        var index = this.companyThemes.indexOf(name);
          if (index > -1) {
            this.companyThemes.splice(index, 1);
          }
          this.companyModel.themes = this.companyThemes;
          this.companyService.updateCompany(this.companyModel).then(data => {
               this.companyModel = data['company'];
               this.companyService.setCompany(this.companyModel); 
               this.nav.setRoot(TabsNavigationPage);
                
          });
    }
    
  }
/**
 * Method to Join current theme
 */
  doJoinTheme(name){
      if(confirm("Join this theme ?")){
          this.companyThemes.push(name);
          this.companyModel.themes = this.companyThemes;
          this.companyService.updateCompany(this.companyModel).then(data => {
                this.companyModel = data['company'];
                this.companyService.setCompany(this.companyModel);
                
                this.nav.setRoot(TabsNavigationPage);
          });
      }
  }
}