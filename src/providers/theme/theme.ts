//import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ThemeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeProvider {
  themes:any ;
  token:any;
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ThemeProvider Provider');
  }
  getThemes(){
    return new Promise((resolve, reject) => {

      //Load token if exists
      this.storage.get('token').then((value) => {

          this.token = value;

          let headers = new Headers();
          headers.append('Authorization', this.token);

          this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/themes/', {headers: headers})
              .subscribe(res => {
                  //let data = res.json();
                  //console.log(data.length);
                  resolve(res);
              }, (err) => {
                  reject(err);
              });

      });

  });

  }
}
