import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnoncesPage } from './annonces';

@NgModule({
  declarations: [
    AnnoncesPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnoncesPage),
  ],
})
export class AnnoncesPageModule {}
