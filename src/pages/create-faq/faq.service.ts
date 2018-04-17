/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for FAQ such as Http 
 * calls to API which includes get and post request.
 * **************************************************************/
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ProfileService } from '../profile/profile.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FAQService {
  token: any;
  constructor(public http: Http,public storage:Storage,public profileService: ProfileService) {}

async getFAQs() {
    
  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

        this.token = value;
        let headers = new Headers();
        headers.append('Authorization', this.token);
            
        this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/faqs/getFaqs', {headers: headers})
              .subscribe(res => {
                    
                resolve(res);

              }, (err) => {
                reject(err);
              }); 
        
        
        }, (err) => {
    });    
  });
}
  
async createFAQ(faq){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/faqs/createFaq', JSON.stringify(faq), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
    });  
  });
}

async updateFAQ(faq){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //console.log("FAQ before http call"+ faq);
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/faqs/updateFaq', JSON.stringify(faq), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });
}

}