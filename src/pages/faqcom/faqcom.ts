import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';

/**
 * Generated class for the FaqcomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqcom',
  templateUrl: 'faqcom.html',
})
export class FaqcomPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqcomPage');
  }

  public retour() {
    this.navCtrl.pop();
  }

}
