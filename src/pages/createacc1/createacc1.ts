import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Createacc2Page } from '../createacc2/createacc2';

/**
 * Generated class for the Createacc1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createacc1',
  templateUrl: 'createacc1.html',
})
export class Createacc1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc1Page');
  }

  public precedent(){
    this.navCtrl.pop();
  }

  public nextStep(){
    let cacc2 = Createacc2Page;
    this.navCtrl.push(cacc2);
  }

}