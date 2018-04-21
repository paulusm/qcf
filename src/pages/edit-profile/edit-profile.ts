/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page is responsible for displaying details of logged-in
 * User details get render on page initiation.
 * User can replace or fill in new information and update them. 
 * This function have been used for this task:
 * saveChanges()
 * User can replace their images using mobile camera or choose from galary
 * These functions perform these tasks:
 * uploadFile()
 * takePicture()
 * presentActionSheet()
 * This page also provide more functionalities using these functions
 * Change password = onChangePassword()
 * Change Color Theme = onThemeChange()
 * Rate App = rateApp()
 * Privacy Policy = showPrivacyModal()
 * Terms of use = showTermsModal()
 * Log out = logout()
 ***************************************************************/

import { NavController, ModalController, LoadingController, Platform ,ActionSheetController,ToastController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FormGroup, FormControl } from '@angular/forms';
import { FilePath } from '@ionic-native/file-path';
import { AppRate } from '@ionic-native/app-rate';
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileService } from '../profile/profile.service';
import { FilesProvider } from '../../providers/files/files';
import { UserModel } from '../profile/profile.model';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { ChangePasswordPage } from '../change-password/change-password';
import { LoginPage } from '../login/login';
import { AppColorThemePage } from '../app-color-theme/app-color-theme';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';


import 'rxjs/Rx';

@Component({
  selector: 'edit-profile-page',
  templateUrl: 'edit-profile.html'
})
/**
 * Class representing Edit profile Page
 */
export class EditProfilePage {
  HAS_SEEN_WALKTHROUGH = 'hasSeenWalkthrough';
  image: any = null;
  settingsForm: FormGroup;
  rootPage: any = LoginPage;
  loading: any;
  imageUpload: boolean;
  colorTheme: any;
  colorThemeHeader:any;
  roleStatus:boolean=false;

  profile: UserModel = new UserModel();
  userModel:UserModel = new UserModel();
  
  details:any;
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public profileService: ProfileService,
    public appRate: AppRate,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    private camera: Camera,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    public storage: Storage,
    public authService: AuthenticationProvider,
    private transfer: FileTransfer,
    public files: FilesProvider,
    public http:Http,
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.imageUpload =false;
    
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

    this.loading = this.loadingCtrl.create({
      content: 'Loading profile...'
    });
    
    this.settingsForm = new FormGroup({
      forename: new FormControl(),
      surename: new FormControl(),
      displayName: new FormControl(),
      department: new FormControl(),
      jobtitle: new FormControl(),
      about: new FormControl()
    });
  }
/**
 * Default method tigger just after this page load in device 
 */
  ionViewWillLoad() {
    
    this.loading.present();
     
    this.image = "./assets/images/emp.png";
   
    this.profileService.getUserImage().then((profileImg)=>{
      if(profileImg){
        this.image = 'https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+profileImg;
      }
    });
    

    this.profileService.getData().then(data => {
  
      // setValue: With setValue, you assign every form control value at once by passing in a data object whose properties exactly match the form model behind the FormGroup.
      // patchValue: With patchValue, you can assign values to specific controls in a FormGroup by supplying an object of key/value pairs for just the controls of interest.
      
      if(data.role==="Employee"){
        this.roleStatus=true;
      }
      console.log("roleStatus: "+this.roleStatus);
      this.settingsForm.patchValue({
        forename: data.forename,
        surename: data.surename,
        displayName: data.displayname,
        department: data.department,
        jobtitle: data.jobtitle,
        about: data.about
      });

      this.loading.dismiss();
      
    });
  }
  /**
   * Method use to logout current user by removing authencation details from local memory
   */
  logout() {
    // navigate to the new page if it is not the current page
    this.storage.set(this.HAS_SEEN_WALKTHROUGH, false);
    this.storage.set('token', '');
    this.storage.remove('token');
    this.storage.set('userModel',null);
    this.storage.remove('userModel');
    this.storage.set('profileImage', '');
    this.storage.remove('profileImage');
    this.storage.set('company', null);
    this.storage.remove('company');
    //this.storage.set('app-theme-color', null);
    //this.storage.remove('app-theme-color');
    this.nav.insert(0,LoginPage);
    this.nav.popAll();
    //this.nav.setRoot(this.rootPage);
  }
  /**
   * Method present Terms Of Service Page
   */
  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }
  /**
   * Method present Privacy policy Page
   */
  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }
  /**
   * Method to navigate to change password page
   */
  onChangePassword(){
    this.nav.push(ChangePasswordPage); 

  }
  /**
   * Method to launch Rate this app 
   */
  rateApp(){
    if(this.platform.is('cordova')){
      this.appRate.preferences.storeAppURL = {
        ios: '<my_app_id>',
        android: 'market://details?id=<package_name>',
        windows: 'ms-windows-store://review/?ProductId=<Store_ID>'
      };

      this.appRate.promptForRating(true);
    }
    else{
      console.log("You are not in a cordova environment. You should test this feature in a real device or an emulator");
    }
  }
  /**
   * Method to present Action Sheet with camera and library  options
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
   * Method to handle errors
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
  /**
   * Method to take picture by camera or chosen from library
   * 
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
 * Method to presend toast to display message on device
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
   * Method to upload image to database by using file transfer service
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
                    this.profileService.setUserImage(imageName.filename);
                    loader.dismiss();
                    this.presentToast("Image uploaded successfully");
                    this.saveChanges(); 

                }, (err) => {
                  console.log(err);
                  loader.dismiss();
                  this.presentToast(err);
                });
    });
  } 
  /**
   * Method to navigate to App Color-Theme Page
   */
  onThemeChange(){
    this.nav.push(AppColorThemePage); 
  }
  /**
   * Method to save changes in profile to database by using authService
   */
  saveChanges(){
    
    this.profileService.getData()
    .then(data => {
      this.profile = data;
      
      this.profile.forename = this.settingsForm.get('forename').value;
      this.profile.surename = this.settingsForm.get('surename').value;
      this.profile.displayname = this.settingsForm.get('displayName').value;
      this.profile.department = this.settingsForm.get('department').value;
      this.profile.about = this.settingsForm.get('about').value;
      this.profile.jobtitle = this.settingsForm.get('jobtitle').value;
      
      this.profileService.getUserImage().then((value) => {
        this.profile.imagepath = value;
        
        this.details = {
          _id: this.profile._id,
          email: this.profile.email,
          role: this.profile.role,
          forename: this.profile.forename,
          surname: this.profile.surename,
          department: this.profile.department,
          companyid: this.profile.companyid,
          displayname: this.profile.displayname,
          isfirstlogin: this.profile.isfirstlogin,
          imagepath: this.profile.imagepath,
          jobtitle:this.profile.jobtitle,
          about: this.profile.about
        };
        
        this.authService.updateAccount(this.details).then((result) => {
          this.userModel.setUser(result['user']);  

          this.profileService.setData(this.userModel);  
          this.nav.insert(0,TabsNavigationPage);
          this.nav.popToRoot();

        }, (err: any) => {
              this.loading.dismiss();
              alert(`status: ${err.status}, ${err.statusText}`);
        });

        return value;
      }).catch(this.handleError);
      
      
      this.loading.dismiss();
    });

  }
}
