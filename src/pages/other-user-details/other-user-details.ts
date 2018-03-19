import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OtherUserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-other-user-details',
  templateUrl: 'other-user-details.html',
})
export class OtherUserDetailsPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("newItem");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserDetailsPage');
  }

}
