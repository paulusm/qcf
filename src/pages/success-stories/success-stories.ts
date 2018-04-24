/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying all Success Stories published by QCF.
 * Success Stories  get render on page initiation in form of ionic list.
 * By sliding left to each List item user can go to details of particular  
 * Success Story. User can also filter Success Stories by using given search bar .
 * These function have been used for these task:
 * goToSuccessStoriesDetail()
 * setFilteredItems()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { SuccessStoriesModel } from './success-stories.model';
import { SuccessStoriesService } from './success-stories.service';

import { SuccessStoriesDetailsPage } from '../success-stories-details/success-stories-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { CompanyModel,CompanyProvider } from '../../providers/company/company';

import { ThemeProvider } from '../../providers/theme/theme';

@Component({
  selector: 'page-success-stories',
  templateUrl: 'success-stories.html',
})
/**
 * 
 */
export class SuccessStoriesPage {

  stories: SuccessStoriesModel = new SuccessStoriesModel();
  companyModel: CompanyModel =new CompanyModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;

  items: any;
  searchTerm: string = '';

  themeIds:any=[];

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param successStoriesService 
   * @param loadingCtrl 
   * @param appThemeColorProvider 
   * @param companyService 
   * @param themeService 
   */
  constructor(
    public nav: NavController,
    public successStoriesService: SuccessStoriesService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider,
    public companyService: CompanyProvider,
    public themeService : ThemeProvider    
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
    this.themeService.getThemes().then((data)=>{
      let allThemes = JSON.parse(data['_body']);
       this.companyService.getCompany().then((value)=>{
        this.companyModel = value;//data['company']; 
        let companyThemes = this.companyModel.themes;
            let count=0;
            for(let ct of companyThemes){    
                for(let t of allThemes){
                  if(ct===t.name){
                    this.themeIds.push(t._id);
                  }
                }
                count++;
            }
            this.loading.present();
      this.successStoriesService
      .getSuccessStory()
      .then(data => {
         
              let activeStories:any = [];
              this.stories.items = JSON.parse(data['_body']);
              for(let n of this.stories.items){
                  if(n.type==="Story"){
                    for(let ts of this.themeIds){
                      if(ts===n.themeid){
                        n.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                        if(n.imagepath===null || n.imagepath===undefined){
                          n.displayImage =  './assets/images/noimage.jpeg';
                        }
                        activeStories.push(n);      
                      }
                    }
                  }
              }
              this.stories.items = activeStories;
              this.items = activeStories;
              
        this.loading.dismiss();
      },(err) => {
        
      }); 

       });
    });
  }

  /**
 * 
 */
  goToSuccessStoriesDetail(item:any){
    this.nav.push(SuccessStoriesDetailsPage, { newItem: item });
  }
  /**
 * 
 */
  filterItems(searchTerm){
    return this.items.filter((item) => {
        return item.storytitle.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }
  /**
 * 
 */
  setFilteredItems() {
 
    this.stories.items = this.filterItems(this.searchTerm);

  }
}