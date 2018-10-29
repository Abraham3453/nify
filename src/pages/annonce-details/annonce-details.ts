import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnnonceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce-details',
  templateUrl: 'annonce-details.html',
})
export class AnnonceDetailsPage {

  user: any;
  ad: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {

    this.user = navParams.get('user');
    this.ad = navParams.get('ad');
    console.log(JSON.stringify(this.user));
    console.log(JSON.stringify(this.ad));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnonceDetailsPage');
  }

  public precedent(){
    this.navCtrl.pop();
  }

}
