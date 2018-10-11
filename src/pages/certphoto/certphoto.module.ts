import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertphotoPage } from './certphoto';

@NgModule({
  declarations: [
    CertphotoPage,
  ],
  imports: [
    IonicPageModule.forChild(CertphotoPage),
  ],
})
export class CertphotoPageModule {}
