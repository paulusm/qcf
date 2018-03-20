import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';



@Injectable()
    
export class AuthenticationProvider {
  token:any;
  role:any;
  
  HAS_SEEN_WALKTHROUGH = 'hasSeenWalkthrough';
  
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AuthenticationProvider Provider');
  }
  
  checkAuthentication(){

    return new Promise((resolve, reject) => {

        //Load token if exists
        this.storage.get('token').then((value) => {

            this.token = value;

            let headers = new Headers();
            headers.append('Authorization', this.token);

            this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });

        });

    });

  }

  checkRole(){

       return new Promise((resolve, reject) => {

           //Load token if exists
           this.storage.get('role').then((value) => {

               this.role = value;
              resolve(value);
           }, (err) => {
            console.log("Not already authorized");
            reject(err);
           });
       });

  }

  createAccount(details){

    console.log("Running createAccount");
    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');

       this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            this.role = data.user["role"];
            console.log("Sign Up ->>>>> Role - " + this.role)
            resolve(data);

          }, (err) => {
            reject(err);
          });
        });    
    });

  }

  updateAccount(details){

    console.log("Running updateAccount");
    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');
        //alert(details.email);
       this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/users/updateprofile', JSON.stringify(details), {headers: headers})
          .subscribe(res => {

            let data = res.json();
            this.token = data.token;
            this.role = data.user["displayname"];
            console.log("Update ->>>>> Role - " + this.role)
            resolve(data);

          }, (err) => {
            reject(err);
          });
        });  
    });

  }

  login(credentials){

    return new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        //headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');
        //alert("credentials in login "+credentials.email+" "+credentials.password);
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

  changePassword(credentials){

      console.log("Running loginchangepassword service");
       return new Promise((resolve, reject) => {
    
            let headers = new Headers();
           headers.append('Content-Type', 'application/json');
           //headers.append('Authorization', this.token);
          console.log(">>" + credentials.email);
          console.log(">>" + credentials.password);
           this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/changepassword', JSON.stringify(credentials),{headers:headers})
             .subscribe(res => {
    
               let data = res.json();
               this.token = data.token;
               this.role = data.user["role"];
               console.log("Role - " + this.role)
               this.storage.set('token', data.token);
               this.storage.set('role', data.user["role"]);
               resolve(data);
    
               resolve(res.json());
             }, (err) => {
               console.log("Error in Change Password");
               reject(err);
             });
    
       });

  }

  forgot(email){
    return new Promise((resolve, reject) => {
      
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
             headers.append('Content-Type', 'application/json');

             console.log("forgot -> "+JSON.stringify(email));

             this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/forgot', JSON.stringify(email), {headers: headers})
               .subscribe(res => {
      
                 let data = res.json();
                 console.log("Called forgot service")
                 resolve(data);
      
               }, (err) => {
                 reject(err);
               });
          });    
         });
  } 

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

             console.log(JSON.stringify(credentials));

             this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/auth/resetchg', JSON.stringify(credentials), {headers: headers})
               .subscribe(res => {
      
                 let data = res.json();
                 console.log("Called resetchange service")
                 resolve(data);
      
               }, (err) => {
                 reject(err);
               });
              });      
         });
  }
  logout(){
    //alert("Logout");
    this.storage.set(this.HAS_SEEN_WALKTHROUGH, false);
    this.storage.set('token', '');
    this.storage.remove('token');
    this.storage.set('userModel','');
    this.storage.remove('userModel');
    this.storage.set('profileImage', null);
    this.storage.remove('profileImage');
  }

}
