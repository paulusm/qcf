import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';

import { ThemeProvider } from '../../providers/theme/theme';

import { CompanyProvider } from '../../providers/company/company';

import { CompanyModel } from '../../providers/company/company';

@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage {
  listing: ListingModel = new ListingModel();
  loading: any;

  companyLogo:any;

  themes:any;

  company: CompanyModel = new CompanyModel();

  value:boolean;
  groups:any;
  shownGroup:any = null;

  constructor(
    public nav: NavController,
    public listingService: ListingService,
    public loadingCtrl: LoadingController,
    public themeService:ThemeProvider,
    public companyService: CompanyProvider
  ) {
    this.loading = this.loadingCtrl.create();

    this.companyLogo = "./assets/images/businessLogo.png";
    /* this.companyService.getCompany().then(data => {
          this.company = data;
          this.companyLogo = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/' + this.company.filename;
    }); */

    this.themeService.getThemes().then((res) => {
      this.groups = JSON.parse(res['_body']); 
        for(var i=0; i<this.groups.length;i++){
             if(this.groups[i].name==="Fairness"){
                    this.groups[i].status = true;
             }else{
                    this.groups[i].status = false;
             } 

        }
        console.log("Right Here >>> "+this.groups);
        }, (err) => {
      
            this.loading.dismiss();
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
    this.nav.push(FeedPage, { category: category });
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

  doLeaveTheme(){
    alert("Are you sure you want to leave this theme ?");
  }
  doJoinTheme(){
    alert("Are you sure you want to join this theme ?");
  }





}
