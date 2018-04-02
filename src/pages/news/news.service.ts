import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';

//import { NewssModel } from './news.model';

@Injectable()
export class NewsService {
  token: any;
  constructor(public http: Http,public storage:Storage) {}

  /* getData(): Promise<NewssModel> {
    return this.http.get('./assets/data/news.json')
     .toPromise()
     .then(response => response.json() as NewssModel)
     .catch(this.handleError);
  } */
  async getNews() {
    
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

  /* private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } */

}