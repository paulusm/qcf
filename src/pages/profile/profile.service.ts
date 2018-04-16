/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for user-profile such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';
import { UserModel } from '../../pages/profile/profile.model';

@Injectable()
export class ProfileService {
 token:any;
  constructor(
    public http: Http,
    public storage: Storage
  ) {}

  
  async getData(): Promise<UserModel> {
    return await this.storage.get('userModel').then((value) => {
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

  async getUsers() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        
         this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/users/', {headers: headers})
          .subscribe(res => {
                
            resolve(res);

          }, (err) => {
            reject(err);
          }); 
        }, (err) => {
          
        });    

        
    });

}

}
