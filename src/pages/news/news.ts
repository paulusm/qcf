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



  constructor(
    public nav: NavController,
    public newsService: NewsService,
    public loadingCtrl: LoadingController,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.loading = this.loadingCtrl.create();
    this.appThemeColorProvider.getAppThemeColor().then((value)=>{
      if(value===null){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-1'){
        this.colorTheme = 'app-color-theme-1';
        this.colorThemeHeader = 'ion-header-1';
      }else if(value==='app-color-theme-2'){
        this.colorTheme = 'app-color-theme-2';
        this.colorThemeHeader = 'ion-header-2';
      }
    });
  }

  ionViewDidLoad() {
    this.loading.present();
    this.newsService
      .getData()
      .then(data => {
        this.news.items = data.items;
        //console.log(data.items);
        this.loading.dismiss();
      });
  }
  goToNewsDetail(item:any){
    //alert(item.title);
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>"+item.title);
    this.nav.push(NewsDetailsPage, { newItem: item });
  }

}