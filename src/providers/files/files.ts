/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for files(images) such as Http 
 * calls to API which includes upload request. Also get and 
 * set values in local storage
 * **************************************************************/
import { Injectable } from '@angular/core';
import { ProfileService } from '../../pages/profile/profile.service';
import { Http, Headers } from '@angular/http';
import { LoadingController,ToastController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/*
  Class for the FilesProvider provider.

*/
@Injectable()
export class FilesProvider {

  constructor(
    public http: Http,
    public profileService:ProfileService,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public toastCtrl: ToastController,
    public authService: AuthenticationProvider
  ) {
    console.log('Hello FilesProvider Provider');
  }
  /**
   * Method to download file from database
   * @param filename 
   */
  async download(filename) {
    //alert("In download..." + filename);
     return await new Promise((resolve, reject) => {
          //Http get request to API app to get file
          this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/files/file/'+ filename)
              .subscribe(res => {
                  //alert(">>>>> "+res.url);  
                  this.profileService.setUserImage(res.url);
              resolve(res);
              }, (err) => {
                  reject(err);
              });
    });
  }
  /**
   * Method to upload file into database by given imageURI
   * @param imageURI 
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
                alert("@image@ "+ imageURI);  
                //Http upload request to API app to get upload images
                fileTransfer.upload(imageURI, encodeURI('https://ionic2-qcf-auth.herokuapp.com/api/files/upload'), options,true)
                  .then((data) => {

                    let imageName = JSON.parse(data.response);
                    alert(imageName.filename);

                    this.profileService.setUserImage(imageName.filename);
                    //this.storage.set('profileImage', imageName.filename);

                  //alert(data.response + " Uploaded Successfully");
                  //alert(imageName.filename + " Uploaded Successfully");
                  
                  loader.dismiss();
                  //alert(data);
                  this.presentToast("Image uploaded successfully");
                }, (err) => {
                  console.log(err);
                  loader.dismiss();
                  this.presentToast("upload -> "+err);
                });
    });
  }
  /**
   * Method to present toast to display text in device
   * @param text 
   */
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
