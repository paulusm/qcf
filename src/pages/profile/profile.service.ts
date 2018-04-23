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
/**
 * Class representing Profile Service
 */
export class ProfileService {
 token:any;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param http 
   * @param storage 
   */
  constructor(
    public http: Http,
    public storage: Storage
  ) {}

/**
 * Method to get user data from local storage
 */
  async getData(): Promise<UserModel> {
    return await this.storage.get('userModel').then((value) => {
      return value;
    }).catch(this.handleError);
  };
/**
 * Method to set user in local storage
 */
  async setData(userModel){
    await this.storage.set('userModel', userModel);
  }
/**
 * Method to handle http calls' errors
 */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
/**
 * Method to get user image from local storage
 */async getUserImage(){
    return await this.storage.get('profileImage');
  }
/**
 * Method to set user data in local storage
 */
  async setUserImage(newImage){
    await this.storage.set('profileImage', newImage);
  }
/**
 * Method to get all users
 */
  async getUsers() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        //Http get request to API app to users
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