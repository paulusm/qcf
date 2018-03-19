import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ActivitiessModel } from './activities.model';

@Injectable()
export class ActivitiesService {
  constructor(public http: Http) {}

  getData(): Promise<ActivitiessModel> {
    return this.http.get('./assets/data/news.json')
     .toPromise()
     .then(response => response.json() as ActivitiessModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}