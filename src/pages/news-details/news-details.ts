import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { UserModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';
import { NewsService } from '../news/news.service';



@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;
  isLiked:boolean = false;

  userModel:UserModel = new UserModel();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public socialSharing: SocialSharing,
    public profileService:ProfileService,
    public newsService:NewsService,
    public appThemeColorProvider:AppThemeColorProvider) {
      this.item = navParams.get("newItem");
      this.profileService.getData()
      .then(data => {
        this.userModel = data;
        
        console.log("Likes ->> "+this.item.likes.indexOf(this.userModel.email));
        if(this.item.likes.indexOf(this.userModel.email) !== -1){
            this.isLiked = true;
        }
        //console.log(JSON.stringify(this.item));

      });
      
          
    // alert(this.item.type);
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
    console.log('ionViewDidLoad NewsDetailsPage');
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
   likeNews(){
     //alert(this.isLiked);
     if(this.isLiked){
      var index = this.item.likes.indexOf(this.userModel.email);    // <-- Not supported in <IE9
      if (index !== -1) {
        this.item.likes.splice(index, 1);
      }

      this.newsService.updateLikes(this.item).then((result) => {
        this.item = result['_body'].story;
        console.log(this.item);
      }, (err: any) => {
            alert(`status: ${err.status}, ${err.statusText}`);
      });




     }else{
        this.item.likes.push(this.userModel.email);
        this.newsService.updateLikes(this.item).then((result) => {
           this.item = result['_body'].story;
           console.log(this.item); 
        }, (err: any) => {
              alert(`status: ${err.status}, ${err.statusText}`);
        });
     }
     //alert(this.item.likes);
     this.isLiked= !this.isLiked;

   }
}
