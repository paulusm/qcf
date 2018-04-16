/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for news such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class NewsService {
  token: any;
  constructor(public http: Http,public storage:Storage) {}

  async getNews() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        let companyid = '5ab7dbc0bc24e300543c';
         this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/stories/getApprovedStories/'+companyid, {headers: headers})
          .subscribe(res => {
                
            resolve(res);

          }, (err) => {
            reject(err);
          }); 
        }, (err) => {
          
        });    

        
    });

}

async updateLikes(item) {
    
  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/stories/updateStory', JSON.stringify(item), {headers: headers})
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