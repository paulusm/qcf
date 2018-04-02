import { Injectable } from "@angular/core";
//import { Http } from '@angular/http';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
//import { NotificationsModel } from './notifications.model';

//import { ProfilesModel } from '../profile/profile.model';

import { Storage } from '@ionic/storage';

@Injectable()
export class NotificationsService {
  token: any;
  constructor(public http: Http,public storage:Storage) {}

  /* getData(): Promise<NotificationsModel> {
    return this.http.get('./assets/example_data/notifications.json')
     .toPromise()
     .then(response => response.json() as NotificationsModel)
     .catch(this.handleError);
  } */

  async getUsers() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        //headers.append('Content-Type', 'application/json');
        
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

  /* private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } */

}
