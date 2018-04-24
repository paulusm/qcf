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
/**
 *  Service provider class for Activities
 */
export class ActivitiesService {
  token: any;
  /**
   * Initialize class object and injecting imported dependencies and services
   * @param http 
   * @param storage 
   * @param profileService 
   */
  constructor(public http: Http,public storage:Storage,public profileService: ProfileService) {}
/**
 *  Method return all Activities from DB  
 */
async getAllActivities() {
    
  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;
      
      this.profileService.getData().then(data => {

          let headers = new Headers();
          headers.append('Authorization', this.token);
          //Http get request to API app to get activities
          this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/activities/getActivities/', {headers: headers})
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
/**
 *  Method return all Activities from DB created by logged in user.
 */
  async getOwnersActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            //Http get request to API app to get owner activities
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
/**
 * Method return all Activities from DB currently running or will start in  future and they are approved
 */
  async getActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            //Http get request to API app to get approved activities
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
  /**
 * Method return all Activities from DB still need approval from admin
 */
  async getUnapprovedActivities() {
    
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        this.profileService.getData().then(data => {

            let headers = new Headers();
            headers.append('Authorization', this.token);
            //Http get request to API app to get  unapproved activties
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
/**
 *  Method creates new activity
 *  Parameter: object containing all activity fields to save 
 */
async createActivity(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //Http post request to API app to create activity
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/createActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}
/**
 *  Method update activity
 *  Parameter: object containing all activity fields to update
 */
async updateActivity(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //Http post request to API app to update activity
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}
/**
 *  Method update 'approve' field of activity
 *  Parameter: object containing  approve fields to update
 */
async approveActivity(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');
      //Http post request to API app to approve activity
     this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/approveActivity', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}
/**
 *  Method update Likes,Sponsor and voulunters fields of activity
 *  Parameter: object containing  Likes,Sponsor and voulunters fields to update
 */
async updateActivityAsEmployee(activity){

  return await new Promise((resolve, reject) => {

    this.storage.get('token').then((value) => {

      this.token = value;

      let headers = new Headers();
      headers.append('Authorization', this.token);
      headers.append('Content-Type', 'application/json');

     //Http post request to API app to update update likes for activity
      this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/activities/updateActivityAsEmployee', JSON.stringify(activity), {headers: headers})
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
      });  
  });

}

/**
 * Method to get image path of activity stored in local storage  
 */
async getActivityImage(){
  return await this.storage.get('activityImage');
}
/**
 * Method to set image path of activity in local storage 
 * patameter: New image path
 */
async setActivityImage(newImage){
  await this.storage.set('activityImage', newImage);
}
  
}