import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the AnnonceAddAnnulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce-add-annuler',
  templateUrl: 'annonce-add-annuler.html',
})
export class AnnonceAddAnnulerPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnonceAddAnnulerPage');
  }

  public dismiss(){
    this.viewCtrl.dismiss();
  }

  public annuler(){
    let home = HomePage;
    this.navCtrl.setRoot(home, {animate: true, direction: 'forward'});
  }

  public publier(){
    let home = HomePage;
    this.navCtrl.setRoot(home, {animate: true, direction: 'forward'});
  }

}
