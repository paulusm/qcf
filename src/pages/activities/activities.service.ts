/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for activities such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/
import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ProfileService } from '../profile/profile.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivitiesService {
  token: any;
  constructor(public http: Http,public storage:Storage,public profileService: ProfileService) {}
  
  async getOwnersActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            
            this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getActivityByOwnerID/'+data._id, {headers: headers})
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

  async getActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            
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

  async getUnapprovedActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            
            this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getActivitiesUnapproved/'+data.companyid, {headers: headers})
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

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/createActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}

async updateActivity(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}
async approveActivity(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/approveActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}

async updateActivityAsEmployee(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');

     
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivityAsEmployee', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}

async getActivityImage(){
  return await this.storage.get('activityImage');
}

async setActivityImage(newImage){
  await this.storage.set('activityImage', newImage);
}
  
}