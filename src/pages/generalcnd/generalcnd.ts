import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the GeneralcndPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generalcnd',
  templateUrl: 'generalcnd.html',
})
export class GeneralcndPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralcndPage');
  }

  public precedent(){
    this.navCtrl.pop();
  }

  public goToHome(){
    let home = HomePage;
    this.navCtrl.push(home);
  }

}
