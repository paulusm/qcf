import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { NewssModel } from './news.model';

@Injectable()
export class NewsService {
  constructor(public http: Http) {}

  getData(): Promise<NewssModel> {
    return this.http.get('./assets/data/news.json')
     .toPromise()
     .then(response => response.json() as NewssModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}