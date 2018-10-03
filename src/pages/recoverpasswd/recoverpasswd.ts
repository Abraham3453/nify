import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnexionPage } from '../connexion/connexion';

/**
 * Generated class for the RecoverpasswdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recoverpasswd',
  templateUrl: 'recoverpasswd.html',
})
export class RecoverpasswdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverpasswdPage');
  }

  public recover(){
    let conn = ConnexionPage;
    this.navCtrl.pop();
  }

}
