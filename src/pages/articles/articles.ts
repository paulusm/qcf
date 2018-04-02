import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ArticlesModel } from './articles.models';
import { ArticlesService } from './articles.service';

import { ArticleDetailsPage } from '../article-details/article-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class ArticlesPage {

  articles: ArticlesModel = new ArticlesModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;

  constructor(
    public nav: NavController,
    public articlesService: ArticlesService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider
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
  }

  ionViewDidLoad() {
    this.loading.present();
      this.articlesService
      .getArticles()
      .then(data => {
         
              let activeArticles:any = [];
              this.articles.items = JSON.parse(data['_body']);
              console.log(JSON.parse(data['_body'])); 
              for(let n of this.articles.items){
                  if(n.type==="Article"){
                    n.imagepath = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                    activeArticles.push(n);
                  }
              }
              this.articles.items = activeArticles;
        this.loading.dismiss();
      },(err) => {
        
      });  
  }
  goToArticlesDetail(item:any){
    this.nav.push(ArticleDetailsPage, { newItem: item });
  }

}