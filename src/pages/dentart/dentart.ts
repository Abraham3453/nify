import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Createacc1Page } from '../createacc1/createacc1';
import { ConnexionPage } from '../connexion/connexion';

/**
 * Generated class for the DentartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dentart',
  templateUrl: 'dentart.html',
})
export class DentartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DentartPage');
  }

  public creerCompte(){
    let cacc = Createacc1Page;
    this.navCtrl.push(cacc);
  }

  public connexion(){
    let conn = ConnexionPage;
    this.navCtrl.push(conn);
  }

}
