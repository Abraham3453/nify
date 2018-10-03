import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralcndPage } from '../generalcnd/generalcnd';

/**
 * Generated class for the Createacc4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createacc4',
  templateUrl: 'createacc4.html',
})
export class Createacc4Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc4Page');
  }

  public precedent(){
    this.navCtrl.pop();
  }

  public displayGC(){
    let gc = GeneralcndPage;
    this.navCtrl.push(gc);
  }

}
