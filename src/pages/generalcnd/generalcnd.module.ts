import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralcndPage } from './generalcnd';

@NgModule({
  declarations: [
    GeneralcndPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralcndPage),
  ],
})
export class GeneralcndPageModule {}
