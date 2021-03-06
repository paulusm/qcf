/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible to present a user guide for this app
 * User will always have option to skip this and go to login screen. 
 * This function have been used for this task:
 * goToLogin()
 * onSlideChanged()
 * skipIntro()
 * **************************************************************/

import { Component, ViewChild } from '@angular/core';
import { NavController, Slides ,ModalController} from 'ionic-angular';
import { ImageModelPage } from '../image-model/image-model';

import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'walkthrough-page',
  templateUrl: 'walkthrough.html'
})
/**
 * Class representing Walkthrough Page
 */
export class WalkthroughPage {

  colorThemeHeader = "ion-header-5";
  lastSlide = false;
  items1:any;
  items2:any;
  items3:any;
  logoImage:any;
  @ViewChild('slider') slider: Slides;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param storage 
   * @param modalCtrl 
   */
  constructor(
    public nav: NavController,
    public storage: Storage,
    public modalCtrl: ModalController) {
    this.logoImage = "./assets/images/main_logo.jpg";  
    this.items1 =[
      {
          "title": "Home",
          "image": "./assets/images/home.jpg",
          "description": "On Home page users can browse Stories and Articles. Also can find charitable themes their company  have joined."
      },
      {
          "title": "Profile",
          "image": "./assets/images/profile.jpg",
          "description": "On Profile page Users can edit their profile,create activity,edit activity and if their role allows they can add user and approve. Also can see they signed up activities."
      },
      {
          "title": "Edit Profile 1",
          "image": "./assets/images/edit_profile_1.jpg",
          "description": "On Edit page users can change their current profile image and other personal details."
      },
      {
          "title": "Edit Profile 2",
          "image": "./assets/images/edit_profile_2.jpg",
          "description": "On Edit page users can also choose to change their password,app color themes, rate this app, view privacy policy and terms of use."
      }
    ];

    this.items2 =[
      {
        "title": "News",
        "image": "./assets/images/news.jpg",
        "description": "On News page users find news list and can choose to see news details by swiping list item to LEFT."
      },
      {
        "title": "Other Participants",
        "image": "./assets/images/other_participants.jpg",
        "description": "On Other Participants page users find list other users from their company  and can choose to see their details by swiping list item to LEFT."
      },
      {
        "title": "Activities",
        "image": "./assets/images/activities.jpg",
        "description": "On Activities page users find approved activities list and can choose to see activity details by swiping list item to LEFT, join that activity or launch phone's navigation app pointing to address of that activity."
      },
      {
        "title": "Activity Results",
        "image": "./assets/images/activityResults.jpg",
        "description": "On Activity Results page users find results and feedback of selected activity."
      }
    ];
    this.items3 =[
      {
          "title": "Create Activity",
          "image": "./assets/images/create_activity.jpg",
          "description": "On Create Activity page users can create new activity which needs to be approved by their company's admin."
      },
      {
          "title": "Close Activity",
          "image": "./assets/images/closeActivity.jpg",
          "description": "On Close Activity page users can close their own activity by providing its results and feedback."
      },
      {
        "title": "FAQ",
        "image": "./assets/images/faqs.jpg",
        "description": "On FAQ page users can see FAQ by QCF or their own company."
    }
    ];
  }
/**
 * Method to skip introduction
 */
  skipIntro() {
    
    // Or you can skip to last slide (login/signup slide)
    this.lastSlide = true;
    this.slider.slideTo(this.slider.length());
  }
  /**
 * Method tigger when user changes screen 
 */
  onSlideChanged() {
    // If it's the last slide, then hide the 'Skip' button on the header
    this.lastSlide = this.slider.isEnd();
  }
  /**
 * Method navigate to do login
 */
  goToLogin() {
    this.storage.set('hasSeenWalkthrough', true);
    this.nav.push(LoginPage);

  }
  /**
 *  method load images 
 */
  openScreen(itm){
    let imageModal = this.modalCtrl.create(ImageModelPage, { item: itm });
    imageModal.present(); 
    //console.log(image);
  }

}
