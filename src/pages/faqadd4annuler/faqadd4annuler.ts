import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the Faqadd4annulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqadd4annuler',
  templateUrl: 'faqadd4annuler.html',
})
export class Faqadd4annulerPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Faqadd4annulerPage');
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
