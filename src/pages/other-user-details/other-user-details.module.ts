import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherUserDetailsPage } from './other-user-details';

@NgModule({
  declarations: [
    OtherUserDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherUserDetailsPage),
  ],
})
export class OtherUserDetailsPageModule {}
