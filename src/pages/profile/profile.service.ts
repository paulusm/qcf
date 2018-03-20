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

  
  async getData(): Promise<UserModel> {
    return await this.storage.get('userModel').then((value) => {
      //alert("UserModel" + value);
      return value;
    }).catch(this.handleError);
  };

  async setData(userModel){
    await this.storage.set('userModel', userModel);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  

  async getUserImage(){
    return await this.storage.get('profileImage');
  }

  async setUserImage(newImage){
    await this.storage.set('profileImage', newImage);
  }

}
