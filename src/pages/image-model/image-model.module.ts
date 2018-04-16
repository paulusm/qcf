import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageModelPage } from './image-model';

@NgModule({
  declarations: [
    ImageModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageModelPage),
  ],
})
export class ImageModelPageModule {}
