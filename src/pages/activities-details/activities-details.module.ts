import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivitiesDetailsPage } from './activities-details';

@NgModule({
  declarations: [
    ActivitiesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivitiesDetailsPage),
  ],
})
export class ActivitiesDetailsPageModule {}
