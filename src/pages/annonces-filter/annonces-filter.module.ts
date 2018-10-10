import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnoncesFilterPage } from './annonces-filter';

@NgModule({
  declarations: [
    AnnoncesFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnoncesFilterPage),
  ],
})
export class AnnoncesFilterPageModule {}
