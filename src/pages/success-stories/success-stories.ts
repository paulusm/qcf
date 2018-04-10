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
export class SuccessStoriesPage {

  stories: SuccessStoriesModel = new SuccessStoriesModel();
  companyModel: CompanyModel =new CompanyModel();
  loading: any;
  colorTheme: any;
  colorThemeHeader:any;

  items: any;
  searchTerm: string = '';

  themeIds:any=[];

  constructor(
    public nav: NavController,
    public successStoriesService: SuccessStoriesService,
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
        this.companyModel = value;//data['company']; 
        let companyThemes = this.companyModel.themes;
            let count=0;
            for(let ct of companyThemes){    
                for(let t of allThemes){
                  if(ct===t.name){
                    //console.log(t._id);
                    //this.themeIds[count]=t._id;
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
              //console.log(JSON.parse(data['_body'])); 
              for(let n of this.stories.items){
                  if(n.type==="Story"){
                    for(let ts of this.themeIds){
                      if(ts===n.themeid){
                        n.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                        activeStories.push(n);      
                      }
                    }
                  }
              }
              this.stories.items = activeStories;
              this.items = activeStories;
              console.log(this.stories.items);
        this.loading.dismiss();
      },(err) => {
        
      }); 

       });
    });
    console.log(this.themeIds);
  }

  ionViewDidLoad() {
    /* this.loading.present();
      this.successStoriesService
      .getSuccessStory()
      .then(data => {
         
              let activeStories:any = [];
              this.stories.items = JSON.parse(data['_body']);
              //console.log(JSON.parse(data['_body'])); 
              for(let n of this.stories.items){
                  if(n.type==="Story"){
                    for(let ts of this.themeIds){
                      if(ts===n.themeid){
                        n.displayImage = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+n.imagepath;
                        activeStories.push(n);      
                      }
                    }
                  }
              }
              this.stories.items = activeStories;
              this.items = activeStories;
              console.log(this.stories.items);
        this.loading.dismiss();
      },(err) => {
        
      }); */  
  }
  goToSuccessStoriesDetail(item:any){
    this.nav.push(SuccessStoriesDetailsPage, { newItem: item });
  }

  filterItems(searchTerm){
    console.log(this.items);
    return this.items.filter((item) => {
        return item.storytitle.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1;
    });    

  }
  setFilteredItems() {
 
    this.stories.items = this.filterItems(this.searchTerm);

  }
}