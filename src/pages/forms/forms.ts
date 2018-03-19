import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormLayoutPage } from '../form-layout/form-layout';
import { FiltersPage } from '../filters/filters';
import { FormValidationsPage } from '../form-validations/form-validations'
//import { Observable } from 'rxjs/Observable';
//import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'forms-page',
  templateUrl: 'forms.html'
})
export class FormsPage {
  items: Array<{title: string, note?: string, component: any}>;

  constructor(
    public nav: NavController
    //public translate: TranslateService
  ) {
  }

  ionViewWillEnter(){
    this.items = [
      { title: 'FormLayoutPage', component: FormLayoutPage },
      { title: 'FiltersPage', component: FiltersPage },
      { title: 'FormValidationsPage', component: FormValidationsPage }
    ];
  }

  itemTapped(event, item) {
    this.nav.push(item.component);
  }
}
