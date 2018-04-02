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
export class NewsPage {

  news: NewssModel = new NewssModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;
  image:any;

  constructor(
    public nav: NavController,
    public newsService: NewsService,
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
              console.log(this.news.items);
        this.loading.dismiss();
      },(err) => {
        
      });  
  }
  goToNewsDetail(item:any){
    this.nav.push(NewsDetailsPage, { newItem: item });
  }

}