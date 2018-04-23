/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for give user functionality of 
 * creating new charitble activity which need to be approved by Bussiness Admin.
 * doCreateActivity() function call activities service to create new activity. 
 * User can upload their images using mobile camera or choose from galary
 * These functions perform these tasks:
 * uploadFile()
 * takePicture()
 * presentActionSheet() 
 * **************************************************************/

import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController,Platform,ToastController,ActionSheetController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { ProfilePage } from '../profile/profile';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileService } from '../profile/profile.service';
import { Storage } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ActivitiesService } from '../activities/activities.service';

import { FilesProvider } from '../../providers/files/files';


@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})
/**
 * Class representing Create Activity Page
 */
export class CreateActivityPage {
  new_activity: FormGroup;
  main_page: { component: any };
  loading: any;
  image = "./assets/images/noimage.jpeg";

  colorTheme: any;
  colorThemeHeader:any;

  activity: any;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param nav 
   * @param transfer 
   * @param files 
   * @param modal 
   * @param loadingCtrl 
   * @param profileService 
   * @param authService 
   * @param toastCtrl 
   * @param storage 
   * @param actionSheetCtrl 
   * @param platform 
   * @param filePath 
   * @param camera 
   * @param appThemeColorProvider 
   * @param activitiesService 
   */
  constructor(
    public nav: NavController,
    private transfer: FileTransfer,
    public files: FilesProvider,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public authService: AuthenticationProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public actionSheetCtrl:ActionSheetController,
    public platform: Platform,
    private filePath: FilePath,
    private camera: Camera,
    public appThemeColorProvider:AppThemeColorProvider,
    public activitiesService:ActivitiesService
  ) {
    this.main_page = { component: TabsNavigationPage };

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

    this.new_activity = new FormGroup({
      activityname: new FormControl('', Validators.required),
      activitydescription: new FormControl('', Validators.required),
      donationmatch: new FormControl(0),
      location: new FormControl(''),
      mydonateurl: new FormControl(''),
      activity_type: new FormControl('sponsorship'),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl(''),
      voluntering:new FormControl(false),
      sponsorship: new FormControl(false),
      targethours:new FormControl(),
      targetamount: new FormControl()
    });
  }

  ionViewDidLoad() {
    
  }
  /**
   * Method to present Action Sheet to choose camera or library to choose image 
   */
  public presentActionSheet() {
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
  /**
   *  Method to either choose image from library or took from camera 
   */
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
  /**
   *  Method to present toast to display message in mobile device
   */
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  } 
  /**
   * Method to upload chosen image in database using file Transfer service provider
   */
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
  } 
  /**
   * Method to create new activity and save in database using activities Service
   */
  doCreateActivity(){

      let temp = [];
    if(this.new_activity.get('voluntering').value===true){
            temp.push('Volunteering');
    }
    if(this.new_activity.get('sponsorship').value===true){
            temp.push('Sponsorship');
    }

    this.profileService.getData().then((data)=>{
      this.activitiesService.getActivityImage().then((img) => {
          let start_date = this.new_activity.get('startdate').value;
          let end_date = this.new_activity.get('enddate').value;
          if(this.new_activity.get('enddate').value===""){
            end_date = this.new_activity.get('startdate').value;
          }
          if(this.new_activity.get('startdate').value===""){
            start_date = this.new_activity.get('enddate').value;
          }
          this.activity = {
              
            activityname: this.new_activity.get('activityname').value,
            activitydescription: this.new_activity.get('activitydescription').value,
            activityowner: data._id,
            companyid: data.companyid,
            enddate: end_date,
            startdate: start_date,
            mydonateurl: this.new_activity.get('mydonateurl').value,
            donationmatch: this.new_activity.get('donationmatch').value,
            activitytype: temp,
            approved: false,
            address: this.new_activity.get('location').value,
            filename: img,
            targethours:this.new_activity.get('targethours').value,
            targetamount:this.new_activity.get('targetamount').value
          };
          
          this.activitiesService.createActivity(this.activity).then((result) => {
            this.nav.setRoot(ProfilePage);
            
          }, (err: any) => {
                alert(`status: ${err.status}, ${err.statusText}`);
          });
      });  
    });  
  }
}