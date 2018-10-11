import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CertphotoPage } from '../certphoto/certphoto';

/**
 * Generated class for the PopupcertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popupcert',
  templateUrl: 'popupcert.html',
})
export class PopupcertPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private modalCtrl: ModalController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupcertPage');
  }

  public dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  public prendrePhoto(){
    let takePic = this.modalCtrl.create(CertphotoPage);
    takePic.onDidDismiss(data => {
      this.viewCtrl.dismiss();
    })
    takePic.present();
  }

}
