/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying details of selected Success Story
 * Success Story get render on page initiation.
 * User been given options to like this activity or share this Success Story. 
 * These function have been used for these task:
 * likeSStory()
 * sharePost()
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { UserModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';
import { SuccessStoriesService } from '../success-stories/success-stories.service';
import { SuccessStoryModel } from '../success-stories/success-stories.model';


@Component({
  selector: 'page-success-stories-details',
  templateUrl: 'success-stories-details.html',
})
/**
 * Class representing Faqs Page
 */
export class SuccessStoriesDetailsPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;
  isLiked:boolean = false;

  userModel:UserModel = new UserModel();
  successStoryModel:SuccessStoryModel = new SuccessStoryModel();
  
  image:any;
  countLike:number=0;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param navCtrl 
   * @param navParams 
   * @param socialSharing 
   * @param profileService 
   * @param successStoriesService 
   * @param appThemeColorProvider 
   */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public socialSharing: SocialSharing,
    public profileService:ProfileService,
    public successStoriesService:SuccessStoriesService,
    public appThemeColorProvider:AppThemeColorProvider) {
      this.item = navParams.get("newItem");
      this.countLike = this.item.likes.length;
      this.profileService.getData()
      .then(data => {
        this.userModel = data;
        
        if(this.item.likes.indexOf(this.userModel.email) !== -1){
            this.isLiked = true;
        }
      });
      
    /**
     * Initializing color-theme for app's header navbar,menu and tabs
     */      
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
  }
  /**
 * 
 */
  sharePost(post) {
    //this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share(post.story, post.storytitle, post.displayImage, null)
    .then(() => {
      console.log('Success!');
    })
    .catch(() => {
       console.log('Error - Sharing');
    }); 
   }
/**
 * Method to update likes of current story
 */
   likeSStory(){
    this.image = this.item.displayImage;
     if(this.isLiked){
      var index = this.item.likes.indexOf(this.userModel.email);    // <-- Not supported in <IE9
      if (index !== -1) {
        this.item.likes.splice(index, 1);
      }

      this.successStoriesService.updateLikes(this.item).then((result) => {
        this.countLike--; 
      }, (err: any) => {
            alert(`status: ${err.status}, ${err.statusText}`);
      });

     }else{
        this.item.likes.push(this.userModel.email);
        this.successStoriesService.updateLikes(this.item).then((result) => {
          this.countLike++; 
        }, (err: any) => {
              alert(`status: ${err.status}, ${err.statusText}`);
        });
     }
     this.isLiked= !this.isLiked;

   }
}
