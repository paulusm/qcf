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

import { NewssModel } from './news.model';
import { NewsService } from './news.service';

import { NewsDetailsPage } from '../news-details/news-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
/**
 * Class representing News Page
 */
export class NewsPage {

  news: NewssModel = new NewssModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  image:any;

  items: any;
  searchTerm: string = '';

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param newsService 
   * @param loadingCtrl 
   * @param appThemeColorProvider 
   */
  constructor(
    public nav: NavController,
    public newsService: NewsService,
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
 * Method tigger just before this page load
 */
  ionViewDidLoad() {
    this.loading.present();
      this.newsService
      .getNews()
      .then(data => {
         
              let activeNews:any = [];
              this.news.items = JSON.parse(data['_body']);
              for(let n of this.news.items){
                if(n.type==='News'){
                    
                    n.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                    activeNews.push(n);
                  }
              }
              this.news.items = activeNews;
              this.items = activeNews;
              
        this.loading.dismiss();
      },(err) => {
        
      });  
  }
/**
 * Method to navigate to details of current News
 */
  goToNewsDetail(item:any){
    this.nav.push(NewsDetailsPage, { newItem: item });
  }
/**
 * Method to filter news by their titles
 */
  filterItems(searchTerm){
    return this.items.filter((item) => {
        return item.storytitle.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }
/**
 * Method set filtered news
 */
  setFilteredItems() {
     this.news.items = this.filterItems(this.searchTerm);
  }

}