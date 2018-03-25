import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppColorThemePage } from './app-color-theme';

@NgModule({
  declarations: [
    AppColorThemePage,
  ],
  imports: [
    IonicPageModule.forChild(AppColorThemePage),
  ],
})
export class AppColorThemePageModule {}
