import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Createacc2Page } from '../createacc2/createacc2';
import { GlobalsProvider } from '../../providers/globals/globals';
import { HTTP } from '@ionic-native/http'


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

  pseudo: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private globals: GlobalsProvider,
    private http: HTTP,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc1Page');
  }

  public precedent() {
    this.navCtrl.pop();
  }

  public nextStep(form) {
    console.log(JSON.stringify(form.value));
    //console.log(JSON.stringify(form));
    if (this.pseudo.length > 30) {
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Votre pseudo ne peut excéder 30 caractères.',
        buttons: ['Ok']
      });
      alert.present();
    }
    else if (this.pseudo.length <= 0) {
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Saisissez votre pseudo.',
        buttons: ['Ok']
      });
      alert.present();
    }
    else {
      this.http.post(this.globals.variables.urls.checkPseudoURL, form.value, {})
        .then(data => {
          let res = JSON.parse(data.data);
          console.log(res);
          console.log(res.status);
          if (res.status == 'ok') {
            let cacc2 = Createacc2Page;
            this.navCtrl.push(cacc2, {
              pseudo: this.pseudo
            });
          }
          console.log(JSON.stringify(data.data));
        }, error => {
          console.log(JSON.stringify(error));
        });
    }

  }

  public tipPseudo() {
    console.log(this.pseudo);
  }

}
