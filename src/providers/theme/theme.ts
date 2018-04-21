/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for charity theme such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/

import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Class for the ThemeProvider provider.

*/
@Injectable()

export class ThemeProvider {
  themes:any ;
  token:any;
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ThemeProvider Provider');
  }
  /**
   * Method to get all charitable theme from database
   */
  async getThemes(){
    return await new Promise((resolve, reject) => {

      //Load token if exists
      this.storage.get('token').then((value) => {

          this.token = value;

          let headers = new Headers();
          headers.append('Authorization', this.token);
          //Http get request to API app to get themes
          this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/themes/getThemes/', {headers: headers})
              .subscribe(res => {
                  resolve(res);
              }, (err) => {
                  reject(err);
              });

      });

  });

  }
}
