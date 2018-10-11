import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Faqadd2Page } from '../faqadd2/faqadd2';
import { File } from '@ionic-native/file';
import { Faqadd1Page } from '../faqadd1/faqadd1';
import { Faqadd4annulerPage } from '../faqadd4annuler/faqadd4annuler';
import { HomePage } from '../home/home';

/**
 * Generated class for the Faqadd3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqadd3',
  templateUrl: 'faqadd3.html',
})
export class Faqadd3Page {

  imgs: any = [];

  img1: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private file: File
  ) {

    let img1 = navParams.get('img');
    console.log(JSON.stringify(img1));
    this.imgs.push(img1);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Faqadd3Page');
    this.showRPC();
  }

  public showRPC() {
    let rpc = this.modalCtrl.create(Faqadd2Page);
    rpc.onDidDismiss(data => {
      console.log(JSON.stringify(data));
    });
    rpc.present();
  }

  public addPhoto(img) {
    let newphoto = this.modalCtrl.create(Faqadd1Page, {
      source: 2
    });
    if (img == 0 && this.imgs.length >= 1) {
      this.imgs.splice(0, 1);
      //this.imgs = this.imgs.values();
    }
    else if (img == 1 && this.imgs.length >= 2) {
      this.imgs.splice(1, 1);
      //this.imgs = this.imgs.values();
    }
    else if (img == 2 && this.imgs.length >= 3) {
      this.imgs.splice(2, 1);
      //this.imgs = this.imgs.values();
    }
    else {
      newphoto.onDidDismiss(data => {
        if (data != null)
          this.imgs.push(data);
        console.log(JSON.stringify(data));
      });
      newphoto.present();
    }

  }

  public annulerClick() {
    let confirm = this.modalCtrl.create(Faqadd4annulerPage);
    confirm.present();
  }

  public publier() {
    let home = HomePage;
    this.navCtrl.setRoot(home, { animate: true, direction: 'forward' });
  }

}
