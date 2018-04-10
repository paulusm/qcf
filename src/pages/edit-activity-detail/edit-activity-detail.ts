import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController,Platform,ToastController,ActionSheetController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
//import { JoinActivityPage } from '../join-activity/join-activity';
//import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';
import { FormGroup, FormControl } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileService } from '../profile/profile.service';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { Storage } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';

import { ActivitiesService } from '../activities/activities.service';

import { FilesProvider } from '../../providers/files/files';

@Component({
  selector: 'page-edit-activity-detail',
  templateUrl: 'edit-activity-detail.html',
})
export class EditActivityDetailPage {
  item:any;
  colorTheme: any;
  colorThemeHeader:any;
  new_activity:any;
  image: any;
  vol: boolean=false;
  spon: boolean=false;
  activity: any;

  constructor(
    public navCtrl: NavController, 
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
    public activitiesService:ActivitiesService,
    public navParams: NavParams,
    public socialSharing: SocialSharing
  ) {
    //this.item = navParams.get("newItem");
    this.item = navParams.get("newItem");
      
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
      
      if(this.item.activitytype.indexOf("Volunteering")!=-1){
                    this.vol = true;
      }
      if(this.item.activitytype.indexOf("Sponsorship")!=-1){
                    this.spon = true;
      }
      this.activitiesService.setActivityImage(this.item.filename);

    this.new_activity = new FormGroup({
      activityname: new FormControl(''),
      activitydescription: new FormControl(''),
      donationmatch: new FormControl(0),
      location: new FormControl(''),
      mydonateurl: new FormControl(''),
      activity_type: new FormControl('sponsorship'),
      startdate: new FormControl(''),
      //from_time: new FormControl('', Validators.required),
      enddate: new FormControl(''),
      //to_time: new FormControl(''),
      voluntering:new FormControl(false),
      sponsorship: new FormControl(false)
    });
    console.log("*******"+JSON.stringify(this.item));
  }

  ionViewDidLoad() {
     this.new_activity.patchValue({
      activityname: this.item.activityname,
      activitydescription: this.item.activitydescription,
      donationmatch: this.item.donationmatch,
      location: this.item.address,
      mydonateurl: this.item.mydonateurl,
      activity_type: this.item.activity_type,
      startdate: this.item.startdate,
      //from_time: new FormControl('', Validators.required),
      enddate: this.item.enddate,
      //to_time: new FormControl(''),
      voluntering: this.vol,
      sponsorship: this.spon
      });
      this.image = this.item.displayImage;
  }
    //    displayImage
  /* sharePost(post) {
    //this code is to use the social sharing plugin
    // message, subject, file, url
    this.socialSharing.share(post.details, post.title, post.url, null)
    .then(() => {
      console.log('Success!');
    })
    .catch(() => {
       console.log('Error - Sharing');
    }); 
   } */
   doUpdateActivity(){
    let temp = [];
    if(this.new_activity.get('voluntering').value===true){
            temp.push('Volunteering');
    }
    if(this.new_activity.get('sponsorship').value===true){
            temp.push('Sponsorship');
    }

    this.profileService.getData().then((data)=>{
      this.activitiesService.getActivityImage().then((img) => {
          console.log("-------->>>>>>>>--------->>>>>>>>>>>--------- "+img);  
          this.activity = {
            _id: this.item._id,
            activityname: this.new_activity.get('activityname').value,
            activitydescription: this.new_activity.get('activitydescription').value,
            activityowner: data._id,
            companyid: data.companyid,
            enddate: this.new_activity.get('enddate').value,
            startdate: this.new_activity.get('startdate').value,
            mydonateurl: this.new_activity.get('mydonateurl').value,
            donationmatch: this.new_activity.get('donationmatch').value,
            activitytype: temp,
            approved: false,
            address: this.new_activity.get('location').value,
            filename: img
          };
          
          this.activitiesService.updateActivity(this.activity).then((result) => {
            console.log(">>>>*** "+JSON.stringify(result));  

            this.navCtrl.insert(0,TabsNavigationPage);
            this.navCtrl.popToRoot();

            
          }, (err: any) => {
                //this.loading.dismiss();
                alert(`status: ${err.status}, ${err.statusText}`);
          });
      });  
    });


    

   }
   
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
    //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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
                //this.saveChanges();
                //this.imageUpload=true;
              });
      } else {
        this.image= imagePath;
        this.uploadFile(imagePath);
        //this.saveChanges();
        //this.imageUpload=true;
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
                    //this.profileService.setUserImage(imageName.filename);
                    this.activitiesService.setActivityImage(imageName.filename);
                    loader.dismiss();
                    this.presentToast("Image uploaded successfully");
                    //this.saveChanges(); 
                }, (err) => {
                  console.log(err);
                  loader.dismiss();
                  this.presentToast(err);
                });
    });
  }
   
}
