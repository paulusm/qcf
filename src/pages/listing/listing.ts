import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController  } from 'ionic-angular';
//import { FeedPage } from '../feed/feed';
import { ArticlesPage } from '../articles/articles';
import { SuccessStoriesPage } from '../success-stories/success-stories';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';
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
export class ListingPage {
  listing: ListingModel = new ListingModel();
  companyModel: CompanyModel =new CompanyModel();
  //company: CompanyModel = new CompanyModel();
  profile: UserModel = new UserModel();

  loading: any;
  companyLogo:any;
  themes:any;
  companyThemes:any;
  
  value:boolean;
  groups:any;
  shownGroup:any = null;
  colorTheme: any;
  colorThemeHeader:any;
  companyName:any;

  constructor(
    public nav: NavController,
    public listingService: ListingService,
    public loadingCtrl: LoadingController,
    public themeService:ThemeProvider,
    public companyService: CompanyProvider,
    public appThemeColorProvider:AppThemeColorProvider,
    public profileService:ProfileService,
    public alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl.create();
    
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-3';
        this.colorThemeHeader = 'ion-header-3';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
      }else if(value==='app-color-theme-3'){
        this.colorTheme = 'app-color-theme-3';
        this.colorThemeHeader = 'ion-header-3';
      }
    });

    this.profileService.getData()
    .then(data => {
      this.profile = data;
      this.companyService.getCompanyInfo(this.profile.companyid).then(data => {
        this.companyModel = data['company'];
        
        this.companyService.setCompany(this.companyModel);
        
        console.log(JSON.stringify(data['company']));
        this.companyLogo = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+this.companyModel.filename;
        this.companyThemes = this.companyModel.themes;
        this.companyName = this.companyModel.companyname;
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
                    }else{
                      this.groups[i].status = false;  
                    }
                }
            }, (err) => {
                this.loading.dismiss();
        });

      });
    });

  }

  ionViewDidLoad() {
    this.loading.present();

    this.listingService
      .getData()
      .then(data => {
        this.listing.banner_image = data.banner_image;
        this.listing.banner_title = data.banner_title;
        this.listing.categories = data.categories;
        this.loading.dismiss();
      });
  }

  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    if(category.title==="Articles"){
      this.nav.push(ArticlesPage);
    }else if(category.title==="Success Stories"){
      this.nav.push(SuccessStoriesPage);
    }  
  }

    /*
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
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  doLeaveTheme(name){
    if(confirm("Leave this theme ?")){
        var index = this.companyThemes.indexOf(name);
          if (index > -1) {
            this.companyThemes.splice(index, 1);
          }
          this.companyModel.themes = this.companyThemes;
          this.companyService.updateCompany(this.companyModel).then(data => {
                this.nav.setRoot(TabsNavigationPage);
                console.log(data);
          });
    }
  }
  doJoinTheme(name){
      if(confirm("Join this theme ?")){
          this.companyThemes.push(name);
          this.companyModel.themes = this.companyThemes;
          this.companyService.updateCompany(this.companyModel).then(data => {
                console.log(data);
                this.nav.setRoot(TabsNavigationPage);
          });
      }
  }
}