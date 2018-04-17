/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for give user functionality of 
 * creating new faq.
 * doCreateFAQ() function call faq service to create new faq.
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController,Platform,ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { ProfilePage } from '../profile/profile';
import { ProfileService } from '../profile/profile.service';
import { Storage } from '@ionic/storage';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { FAQService } from './faq.service';

@Component({
  selector: 'page-create-faq',
  templateUrl: 'create-faq.html',
})
export class CreateFaqPage {
  new_faq: FormGroup;
  main_page: { component: any };
  loading: any;
  image: any = null;

  colorTheme: any;
  colorThemeHeader:any;

  faq: any;
  
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public toastCtrl: ToastController,
    public storage: Storage,
    public platform: Platform,
    public appThemeColorProvider:AppThemeColorProvider,
    public faqService:FAQService
  ) {
    this.main_page = { component: TabsNavigationPage };

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

    this.new_faq = new FormGroup({
      faqtitle: new FormControl('', Validators.required),
      faq: new FormControl('', Validators.required),
    });
  }

  ionViewDidLoad() {
  }

  /* public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present(); 
  } 

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
        quality: 100,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        allowEdit: true,
        targetWidth:250,
        targetHeight:250
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                this.image=filePath;
                this.uploadFile(filePath);
              });
      } else {
        this.image= imagePath;
        this.uploadFile(imagePath);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  } 

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  } 

  async uploadFile(imageURI) {
    return await new Promise((resolve, reject) => {
                let loader = this.loadingCtrl.create({
                  content: "Uploading..."
                });
                loader.present();
                const fileTransfer: FileTransferObject = this.transfer.create();
                
                let headers = new Headers();
                    headers.append('Authorization', this.authService.token);
                let options: FileUploadOptions = {
                  fileKey: 'file',
                  chunkedMode: false,
                  mimeType: "image/jpeg",
                  headers: headers
                }
  
                fileTransfer.upload(imageURI, encodeURI('https://ionic2-qcf-auth.herokuapp.com/api/files/upload'), options,true)
                  .then((data) => {
                    let imageName = JSON.parse(data.response);
                    this.activitiesService.setActivityImage(imageName.filename);
                    loader.dismiss();
                    this.presentToast("Image uploaded successfully");
                }, (err) => {
                  console.log(err);
                  loader.dismiss();
                  this.presentToast(err);
                });
    });
  } */ 

  doCreateFAQ(){
    this.profileService.getData().then((data)=>{
          this.faq = {
            faqtitle: this.new_faq.get('faqtitle').value,
            faq: this.new_faq.get('faq').value,
            companyid: data.companyid
          };
          
          this.faqService.createFAQ(this.faq).then((result) => {
            this.nav.setRoot(ProfilePage);
            
          }, (err: any) => {
                alert(`status: ${err.status}, ${err.statusText}`);
          });
    });  
  }
}