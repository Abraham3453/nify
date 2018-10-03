import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Createacc3Page } from '../createacc3/createacc3';

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

  public precedent(){
    this.navCtrl.pop();
  }

  public nextStep(){
    let caccn = Createacc3Page;
    this.navCtrl.push(caccn);
  }

}
