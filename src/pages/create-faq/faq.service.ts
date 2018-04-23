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
/**
 * Class representing FAQ Service
 */
export class FAQService {
  token: any;

  /**
   * Initialize class object and injecting imported dependencies and services
   * @param http 
   * @param storage 
   * @param profileService 
   */
  constructor(public http: Http,public storage:Storage,public profileService: ProfileService) {}
/**
 *  Mehtod to get all FAQ from database
 */
async getFAQs() {
    
  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

        this.token = value;
        let headers = new Headers();
        headers.append('Authorization', this.token);
        //Http get request to API app to get FAQS    
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
/**
 * Method to create new FAQ using FAQ service
 */  
async createFAQ(faq){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //Http post request to API app to create FAQ
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/faqs/createFaq', JSON.stringify(faq), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
    });  
  });
}
/**
 * Method to update FAQ using FAQ service
 */
async updateFAQ(faq){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //Http post request to API app to update FAQ
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