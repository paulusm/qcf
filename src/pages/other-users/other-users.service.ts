/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for users such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';

@Injectable()
export class NotificationsService {
  token: any;
  constructor(public http: Http,public storage:Storage) {}

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
