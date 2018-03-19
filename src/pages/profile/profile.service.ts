import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
//import { NativeStorage } from '@ionic-native/native-storage';
//import { ProfileModel } from './profile.model';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../pages/profile/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    public http: Http,
    //public nativeStorage: NativeStorage,
    public storage: Storage
  ) {}

  
  getData(): Promise<UserModel> {
    return this.storage.get('userModel').then((value) => {
      return value;
    }).catch(this.handleError);
  };



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  

  getUserImage(){
    return this.storage.get('profileImage');
  }

  setUserImage(newImage){
    this.storage.set('profileImage', newImage);
  }

}
