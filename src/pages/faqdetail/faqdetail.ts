import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FaqcomPage } from '../faqcom/faqcom';

/**
 * Generated class for the FaqdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqdetail',
  templateUrl: 'faqdetail.html',
})
export class FaqdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqdetailPage');
  }

  public precedent(){
    this.navCtrl.pop();
  }

  public comment(){
    let fcom = FaqcomPage;
    this.navCtrl.push(fcom);
  }

}
