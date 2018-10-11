import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AnnoncesFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonces-filter',
  templateUrl: 'annonces-filter.html',
})
export class AnnoncesFilterPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoncesFilterPage');
  }

  public selectFilter(idBtn, idIcon){
    for (let i = 0; i < 3; i++) {
      document.getElementById('btn'+i).style.fontWeight = '100';
      document.getElementById('icon_btn_'+i).style.display = 'none';
    }
    document.getElementById(idIcon).style.display = 'inline';
    document.getElementById(idBtn).style.fontWeight = 'bold';
  }

  public dismiss(){
    this.viewCtrl.dismiss();
  }

}
