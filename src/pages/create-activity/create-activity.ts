import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController,ActionSheetController,Platform,ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { FilesProvider } from '../../providers/files/files';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProfileService } from '../profile/profile.service';
import { Storage } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

import { AppThemeColorProvider } from '../../providers/app-theme-color/app-theme-color';



@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})

export class CreateActivityPage {
  new_activity: FormGroup;
  main_page: { component: any };
  loading: any;
  image: any = null;

  cucumber:boolean;
  carret:boolean;
  
  colorTheme: any;
  colorThemeHeader:any;
  
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
    public appThemeColorProvider:AppThemeColorProvider
  ) {
    this.cucumber = false;
    this.carret = false;
    this.main_page = { component: TabsNavigationPage };

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

    this.new_activity = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      donationmatching: new FormControl(false),
      location: new FormControl(''),
      activity_type: new FormControl('sponsorship'),
      from_date: new FormControl('', Validators.required),
      from_time: new FormControl('', Validators.required),
      to_date: new FormControl(''),
      to_time: new FormControl(''),
      voluntering:new FormControl(false),
      sponsorship: new FormControl(false)
    });
  }
  updateCucumber(){
      this.cucumber = !this.cucumber;
  }
  updateCarret(){
      this.carret = !this.carret;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  doCreateActivity(){
    alert(this.cucumber+"  "+this.carret);
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

  saveChanges(){
    
    /* this.profileService.getData()
    .then(data => {
      this.profile = data;
      
      this.profile.forename = this.settingsForm.get('forename').value;
      this.profile.surename = this.settingsForm.get('surename').value;
      this.profile.displayname = this.settingsForm.get('displayName').value;
      this.profile.department = this.settingsForm.get('department').value;
      
      this.profileService.getUserImage().then((value) => {
        this.profile.imagepath = value;
        
        this.details = {
          email: this.profile.email,
          role: this.profile.role,
          forename: this.profile.forename,
          surname: this.profile.surename,
          department: this.profile.department,
          companyid: this.profile.companyid,
          displayname: this.profile.displayname,
          isfirstlogin: this.profile.isfirstlogin,
          imagepath: this.profile.imagepath
        };
        
        this.authService.updateAccount(this.details).then((result) => {
          //this.loading.dismiss();
          this.userModel.setUser(result['user']);  

          this.profileService.setData(this.userModel);  
          //this.nav.pop();      
          //this.nav.setRoot(this.main_page.component);
          this.nav.insert(0,TabsNavigationPage);
          this.nav.popToRoot();

        }, (err: any) => {
              this.loading.dismiss();
              alert(`status: ${err.status}, ${err.statusText}`);
        });

        return value;
      }).catch(this.handleError);
      
      
      this.loading.dismiss();
    }); */

  }

}