import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { JoinActivityPage } from '../join-activity/join-activity';

@Component({
  selector: 'page-activities-details',
  templateUrl: 'activities-details.html',
})
export class ActivitiesDetailsPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public socialSharing: SocialSharing) {
    this.item = navParams.get("newItem");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad activitiesDetailsPage');
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
   joinActivity(){

    this.navCtrl.push(JoinActivityPage, { newItem: this.item });
   }
}
