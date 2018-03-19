import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import 'rxjs/Rx';

import { ActivitiessModel } from './activities.model';
import { ActivitiesService } from './activities.service';

import { ActivitiesDetailsPage } from '../activities-details/activities-details';
import { JoinActivityPage } from '../join-activity/join-activity';

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {

  activities: ActivitiessModel = new ActivitiessModel();
  loading: any;

  constructor(
    public nav: NavController,
    public activitiesService: ActivitiesService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.activitiesService
      .getData()
      .then(data => {
        this.activities.items = data.items;
        //console.log(data.items);
        this.loading.dismiss();
      });
  }
  goToActivitiesDetail(item:any){
    //alert(item.title);
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>"+item.title);
    this.nav.push(ActivitiesDetailsPage, { newItem: item });
  }
  goToJoinActivity(item:any){
    this.nav.push(JoinActivityPage, { newItem: item });
    //alert(item.url);
  }

}