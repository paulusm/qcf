import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';

//import { ArticlesModel } from './articles.models';

@Injectable()
export class ArticlesService {
  token: any;
  constructor(public http: Http,public storage:Storage) {}

  async getArticles() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        //headers.append('Content-Type', 'application/json');
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

  /* private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } */

}