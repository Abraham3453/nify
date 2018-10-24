import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AnnonceCatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce-cat',
  templateUrl: 'annonce-cat.html',
})
export class AnnonceCatPage {

  cat: any;
  listCat: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {

    this.listCat = navParams.get('listCat');
    console.log("List des categories");
    console.log(JSON.stringify(this.listCat));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnonceCatPage');
  }

  public selectFilter(idBtn, idIcon, selectedCat){
    for (let i = 0; i < this.listCat.length; i++) {
      document.getElementById('btn'+this.listCat[i].id).style.fontWeight = '100';
      document.getElementById('icon_btn_'+this.listCat[i].id).style.display = 'none';
    }
    document.getElementById(idIcon).style.display = 'inline';
    document.getElementById(idBtn).style.fontWeight = 'bold';
    this.cat = selectedCat;
  }

  public dismiss(){
    this.viewCtrl.dismiss(this.cat);
  }

}
