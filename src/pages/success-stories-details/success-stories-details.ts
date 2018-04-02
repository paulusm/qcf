import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';


@Component({
  selector: 'page-success-stories-details',
  templateUrl: 'success-stories-details.html',
})
export class SuccessStoriesDetailsPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public socialSharing: SocialSharing,
    public appThemeColorProvider:AppThemeColorProvider) {
    this.item = navParams.get("newItem");
    //alert(this.item.imagepath);
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
    console.log('ionViewDidLoad SuccessStoriesDetailsPage');
  }

  sharePost(post) {
    //this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share(post.details, post.title, post.url, null)
    .then(() => {
      console.log('Success!');
    })
    .catch(() => {
       console.log('Error - Sharing');
    }); 
   }
}
