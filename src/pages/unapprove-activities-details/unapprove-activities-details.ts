import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { SocialSharing } from '@ionic-native/social-sharing';
//import { JoinActivityPage } from '../join-activity/join-activity';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { ActivitiesService } from '../activities/activities.service';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

@Component({
  selector: 'page-unapprove-activities-details',
  templateUrl: 'unapprove-activities-details.html',
})
export class UnapproveActivitiesDetailsPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  //  public socialSharing: SocialSharing,
    public appThemeColorProvider:AppThemeColorProvider,
    public activitiesService:ActivitiesService
  ) {
    this.item = navParams.get("newItem");
    //console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&"+this.item);
    
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad activitiesDetailsPage');
  }

  /* sharePost(post) {
    //this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share(post.details, post.title, post.url, null)
    .then(() => {
      console.log('Success!');
    })
    .catch(() => {
       console.log('Error - Sharing');
    }); 
   } */
   approveActivity(){
     this.item.approved = true;
    this.activitiesService.approveActivity(this.item).then((result) => {
      console.log(">>>>> "+JSON.stringify(result));  

      this.navCtrl.insert(0,TabsNavigationPage);
      this.navCtrl.popToRoot();

      
    }, (err: any) => {
          //this.loading.dismiss();
          alert(`status: ${err.status}, ${err.statusText}`);
    });
    //this.navCtrl.push(JoinActivityPage, { newItem: this.item });
   }
}
