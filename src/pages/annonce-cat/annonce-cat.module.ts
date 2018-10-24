import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnonceCatPage } from './annonce-cat';

@NgModule({
  declarations: [
    AnnonceCatPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnonceCatPage),
  ],
})
export class AnnonceCatPageModule {}
