import { Component } from '@angular/core';
import { IonicPage, NavParams,Platform,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-image-model',
  templateUrl: 'image-model.html',
})
export class ImageModelPage {
  character;
  item;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.item = params.get("item");
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
