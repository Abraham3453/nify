import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PopupcertPage } from '../popupcert/popupcert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {

    setTimeout(() => {
      this.presentCert();
    }, 2000);

  }

  public presentCert() {
    let cert = this.modalCtrl.create(PopupcertPage,
      {
        user: '1'
      });
    cert.onDidDismiss(data => {
      console.log(data);
    });
    cert.present();
  }

}
