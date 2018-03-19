import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { NewssModel } from './news.model';
import { NewsService } from './news.service';

import { NewsDetailsPage } from '../news-details/news-details';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news: NewssModel = new NewssModel();
  loading: any;

  constructor(
    public nav: NavController,
    public newsService: NewsService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
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