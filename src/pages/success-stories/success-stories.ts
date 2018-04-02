import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { SuccessStoriesModel } from './success-stories.model';
import { SuccessStoriesService } from './success-stories.service';

import { SuccessStoriesDetailsPage } from '../success-stories-details/success-stories-details';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

@Component({
  selector: 'page-success-stories',
  templateUrl: 'success-stories.html',
})
export class SuccessStoriesPage {

  stories: SuccessStoriesModel = new SuccessStoriesModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;

  constructor(
    public nav: NavController,
    public successStoriesService: SuccessStoriesService,
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
      this.successStoriesService
      .getArticles()
      .then(data => {
         
              let activeArticles:any = [];
              this.stories.items = JSON.parse(data['_body']);
              console.log(JSON.parse(data['_body'])); 
              for(let n of this.stories.items){
                  if(n.type==="Story"){
                    n.imagepath = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                    activeArticles.push(n);
                  }
              }
              this.stories.items = activeArticles;
        this.loading.dismiss();
      },(err) => {
        
      });  
  }
  goToSuccessStoriesDetail(item:any){
    this.nav.push(SuccessStoriesDetailsPage, { newItem: item });
  }

}