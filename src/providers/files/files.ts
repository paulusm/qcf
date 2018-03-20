//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from '../../pages/profile/profile.service';
import { Http, Headers } from '@angular/http';
import { LoadingController,ToastController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/*
  Generated class for the FilesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
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

  async download(filename) {
    //alert("In download..." + filename);
     return await new Promise((resolve, reject) => {

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
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
