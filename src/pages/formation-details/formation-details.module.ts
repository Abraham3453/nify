import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormationDetailsPage } from './formation-details';

@NgModule({
  declarations: [
    FormationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FormationDetailsPage),
  ],
})
export class FormationDetailsPageModule {}
