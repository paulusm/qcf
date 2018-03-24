import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
export class CompanyProvider {
  constructor(public http: HttpClient,public storage: Storage) {
    console.log('Hello CompanyProvider Provider');
  }
  

  async getCompany(): Promise<CompanyModel> {
    return await this.storage.get('company').then((value) => {
      return value;
    }).catch(this.handleError);
  };

  async setCompany(company){
    await this.storage.set('company', company);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  async getCompanyInfo(_id) {
    
      return await new Promise((resolve, reject) => {

          this.http.get('https://ionic2-qcf-auth.herokuapp.com/api/companies/getCompanyByCompanyId/'+ _id)
              .subscribe(res => {
                  //alert(">>>>> "+res.url);  
                  //this.profileService.setUserImage(res.url);
              resolve(res);
              }, (err) => {
                  reject(err);
              });
      });

  }

}
