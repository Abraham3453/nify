import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Createacc2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createacc2',
  templateUrl: 'createacc2.html',
})
export class Createacc2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc2Page');
  }

  public selectProfession(idBtn, idIcon){
    for (let i = 0; i < 5; i++) {
      document.getElementById('btn'+i).style.fontWeight = '100';
      document.getElementById('icon_btn_'+i).style.display = 'none';
    }
    document.getElementById(idIcon).style.display = 'inline';
    document.getElementById(idBtn).style.fontWeight = '100';
  }

}
