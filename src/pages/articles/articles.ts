/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying all articles published by QCF
 * particular to those charity themes chosen by user's company.
 * Articles get render on page initiation in form of ionic list.
 * By sliding left to each List item user can go to details of particular  
 * article. User can also filter articles by using given search bar .
 * These function have been used for these task:
 * goToArticlesDetail()
 * setFilteredItems()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ArticlesModel } from './articles.models';
import { ArticlesService } from './articles.service';

import { ArticleDetailsPage } from '../article-details/article-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { CompanyModel,CompanyProvider } from '../../providers/company/company';

import { ThemeProvider } from '../../providers/theme/theme';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  articles: ArticlesModel = new ArticlesModel();
  companyModel: CompanyModel =new CompanyModel();

  loading: any;
  colorTheme: any;
  colorThemeHeader:any;

  items: any;
  searchTerm: string = '';  

  themeIds:any=[];

  constructor(
    public nav: NavController,
    public articlesService: ArticlesService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider,
    public companyService: CompanyProvider,
    public themeService : ThemeProvider
  ) {
    this.loading = this.loadingCtrl.create();
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
        this.companyModel = value;
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
      this.articlesService
      .getArticles()
      .then(data => {
         
              let activeArticles:any = [];
              this.articles.items = JSON.parse(data['_body']);
              console.log(JSON.parse(data['_body'])); 
              for(let n of this.articles.items){
                  if(n.type==="Article"){
                    for(let ts of this.themeIds){
                        if(ts===n.themeid){
                          n.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                          activeArticles.push(n);      
                        }
                    }
                    
                  }
              }
              this.articles.items = activeArticles;
              this.items = activeArticles;
              console.log(this.articles.items);
              this.loading.dismiss();
      },(err) => {
        
      });

       });
       
    });
    
  }

  ionViewDidLoad() {
  
  }
  goToArticlesDetail(item:any){
    this.nav.push(ArticleDetailsPage, { newItem: item });
  }

  filterItems(searchTerm){
    return this.items.filter((item) => {
        return item.storytitle.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }
  setFilteredItems() {
 
    this.articles.items = this.filterItems(this.searchTerm);

  }
}