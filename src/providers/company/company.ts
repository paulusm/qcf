/****************************************************************
 * Created By: Muhammad Asim Baig
 * This ionic page provides Services for company such as Http 
 * calls to API which includes get and post request. Also get and 
 * set values in local storage
 * **************************************************************/
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {AuthenticationProvider} from '../authentication/authentication';

/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class CompanyModel{
  companyname : string;
  companydescription : string;
  filename : string;
  email : string;
  themes : string;
  _id : string;
  colourtheme:string;
  

  constructor() {}
  setCompanyInfo(company){
    this.companyname = company.companyname;
    this.companydescription = company.companydescription;
    this.filename = company.filename;
    this.email = company.email;
    this.themes = company.themes;
    this._id  = company._id;
  }
}

@Injectable()
/**
 *  Class for CompanyProvider
 */
export class CompanyProvider {
  token: any;

  constructor(public http: Http,public storage: Storage,public authService: AuthenticationProvider) {
    console.log('Hello CompanyProvider Provider');
  }
  
  /**
   * Method to get company's detail from local storage
   */
  async getCompany(): Promise<CompanyModel> {
    return await this.storage.get('company').then((value) => {
      return value;
    }).catch(this.handleError);
  };
  /**
   * Method to set company's detail in local storage
   * @param company 
   */
  async setCompany(company){
    await this.storage.set('company', company);
  }

  /**
   * Method to handle error
   * @param error 
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
  /**
   * Method to get company's detail from database by given id and token 
   * @param _id 
   * @param tkn 
   */
  async getCompanyInfo(_id,tkn) {
    
      return await new Promise((resolve, reject) => {

        this.storage.get('token').then((value) => {
          this.token = value;
          let headers = new Headers();
          headers.append('Authorization', tkn);
          
          this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/companies/getCompanyByCompanyId/'+ _id, {headers: headers})
                  .map(res => res.json())
                  .subscribe(data => {
                          resolve(data);
                  }, (err) => {
                            reject(err);
                  });

          });
        });    


  }
  /**
   * Method to update company's detail by given new details
   * @param company 
   */
  async updateCompany(company){
    return await new Promise((resolve, reject) => {

      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');
        //Http post request to API app to get update company
       this.http.post('https://ionic2-qcf-auth.herokuapp.com/api/companies/updateCompany', JSON.stringify(company), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            resolve(data);
          }, (err) => {
            reject(err);
          });
        });  
    });

  }



}
