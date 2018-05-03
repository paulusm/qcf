/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for authentications to Login,
 * Register,Forgot password,Change password  such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';



@Injectable()
/*
 * Class for the AuthenticationProvider provider.
 */    
export class AuthenticationProvider {
  token:any;
  role:any;
  
  HAS_SEEN_WALKTHROUGH = 'hasSeenWalkthrough';
  
  constructor(
    public http: Http, 
    public storage: Storage
  ) {
  }
  /**
   * Method for authentication from database
   */
  checkAuthentication(){

    return new Promise((resolve, reject) => {

        //Load token if exists
        this.storage.get('token').then((value) => {

            this.token = value;

            let headers = new Headers();
            headers.append('Authorization', this.token);
            //Http get request to API app to autenticate user
            this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });

        });

    });

  }
  /**
   * Method for role based authentication from database
   */
  checkRole(){

       return new Promise((resolve, reject) => {

           //Load token if exists
           this.storage.get('role').then((value) => {

               this.role = value;
              resolve(value);
           }, (err) => {
            console.log("Not authorized");
            reject(err);
           });
       });

  }
  /**
   * Method to create new user with given details
   * @param details 
   */
  createAccount(details){

    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');
        //Http post request to API app to register new user
       this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {

    
            resolve(res.json());

          }, (err) => {
            reject(err);
          });
        });    
    });

  }
  /**
   * Method to update current user with given details
   * @param details
   */
  updateAccount(details){

    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');
        //Http post request to API app to update profile
       this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/users/updateprofile', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
        });  
    });

  }
  /**
   * Method to login into app with given credentials
   * @param credentials
   */
  login(credentials){

    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');
        //Http post request to API app to login
        this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {

            let data = res.json();

            resolve(data);

            resolve(res.json());
          }, (err) => {
            reject(err);
          });
        });    
    });

  }
  /**
   * Method to chnage password with given credentials
   * @param credentials  
   */
  changePassword(credentials){

       return new Promise((resolve, reject) => {
    
            let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           //Http post request to API app to chage password
           this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/changepassword', JSON.stringify(credentials),{headers:headers})
             .subscribe(res => {
    
               resolve(res.json());
             }, (err) => {
               console.log("Error in Change Password");
               reject(err);
             });
    
       });

  }
  /**
   * Method to recover forgotten password by given email
   * @param email 
   */
  forgot(email){
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
             headers.append('Content-Type', 'application/json');

            //Http post request to API app to recover password
             this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/forgot', JSON.stringify(email), {headers: headers})
               .subscribe(res => {
      
                 let data = res.json();
                 resolve(data);
      
               }, (err) => {
                 reject(err);
               });
          });    
         });
  } 
  /**
   * Method to reeset forgotten password by given new password and authentication token
   * @param newpassword 
   * @param token 
   */
  resetpassword(newpassword, token){

    let credentials = {
      newpassword: newpassword,
      token: token
    };

    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
             headers.append('Content-Type', 'application/json');

            //Http post request to API app to reset password
             this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/resetchg', JSON.stringify(credentials), {headers: headers})
               .subscribe(res => {
      
                 let data = res.json();
                 resolve(data);
      
               }, (err) => {
                 reject(err);
               });
              });      
         });
  }
  /**
   * Method to logout from app removing all variables from local storage
   */
  logout(){
    this.storage.set(this.HAS_SEEN_WALKTHROUGH, false);
    this.storage.set('token', '');
    this.storage.remove('token');
    this.storage.set('userModel',null);
    this.storage.remove('userModel');
    this.storage.set('profileImage', '');
    this.storage.remove('profileImage');
    this.storage.set('company', null);
    this.storage.remove('company');
    this.storage.set('MenuImage', null);
    this.storage.remove('MenuImage');
    //this.storage.set('app-theme-color', null);
    //this.storage.remove('app-theme-color');
  }
}
