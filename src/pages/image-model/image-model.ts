import { Component } from '@angular/core';
import { NavParams,Platform,ViewController } from 'ionic-angular';


@Component({
  selector: 'page-image-model',
  templateUrl: 'image-model.html',
})
/**
 * Class representing Image Model Page
 */
export class ImageModelPage {
  character;
  item;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param platform 
   * @param params 
   * @param viewCtrl 
   */
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.item = params.get("item");
    
  }
/**
 * Method to dismiss image model 
 */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
