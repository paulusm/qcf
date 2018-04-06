import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ProfileService } from '../profile/profile.service';

import 'rxjs/add/operator/toPromise';

//import { ActivitiessModel } from './activities.model';

@Injectable()
export class ActivitiesService {
  token: any;
  constructor(public http: Http,public storage:Storage,public profileService: ProfileService) {}

  async getActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            
            //headers.append('Content-Type', 'application/json');
            //let companyid = '5ab7dbc0bc24e300543c';
            console.log("companyid -> "+data.companyid);
            this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getFutureActivitiesApprovedByCompanyID/'+data.companyid, {headers: headers})
              .subscribe(res => {
                    
                resolve(res);

              }, (err) => {
                reject(err);
              }); 
        
        });
        
        }, (err) => {
        });    

        
    });

}
async createActivity(activity){

  //console.log("Running updateAccount");
  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //alert(details.email);
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/createActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          /* let data = res.json();
          this.token = data.token;
          this.role = data.user["displayname"];
          console.log("Update ->>>>> Role - " + this.role) */
          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}

async updateActivity(activity){

  //console.log("Running updateAccount");
  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      
      console.log(activity._id +" "+ JSON.stringify(activity));
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivityAsEmployee', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          /* let data = res.json();
          this.token = data.token;
          this.role = data.user["displayname"];
          console.log("Update ->>>>> Role - " + this.role) */
          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}
  /* getData(): Promise<ActivitiessModel> {
    return this.http.get('./assets/data/news.json')
     .toPromise()
     .then(response => response.json() as ActivitiessModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  } */

}