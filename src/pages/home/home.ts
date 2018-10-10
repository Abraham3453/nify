import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, FabContainer } from 'ionic-angular';
import { PopupcertPage } from '../popupcert/popupcert';
import { FaqcomPage } from '../faqcom/faqcom';
import { FaqdetailPage } from '../faqdetail/faqdetail';
import { FaqfilterPage } from '../faqfilter/faqfilter';
import { Faqadd1Page } from '../faqadd1/faqadd1';

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
    }, 1000);

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

  public comment() {
    let fcom = FaqcomPage;
    this.navCtrl.push(fcom);
  }

  public faqDetails() {
    let fdet = FaqdetailPage;
    this.navCtrl.push(fdet);
  }

  public showFilter(fab: FabContainer) {
    fab.close();
    let filter = this.modalCtrl.create(FaqfilterPage,
      {
        user: '1'
      });
    filter.onDidDismiss(data => {
      console.log(data);
    });
    filter.present();
  }

  public newPub(fab: FabContainer){
    fab.close();
    let faq1 = Faqadd1Page;
    this.navCtrl.push(faq1);
  }

}
