import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralcndPage } from '../generalcnd/generalcnd';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';

/**
 * Generated class for the Createacc4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createacc4',
  templateUrl: 'createacc4.html',
})
export class Createacc4Page {

  mail: string = '';
  password: string = '';
  pseudo: string = '';
  job: string = '';
  address: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HTTP,
    private globals: GlobalsProvider
  ) {

    this.pseudo = navParams.get('pseudo');
    this.job = navParams.get('job');
    this.address = navParams.get('address');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc4Page');
  }

  public precedent() {
    this.navCtrl.pop();
  }

  public displayGC() {
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.mail))) {
      console.log("Mail invalid.");
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Votre e-mail est invalide.',
        buttons: ['Ok']
      });
      alert.present();
    }
    else if (this.password.length < 8) {
      console.log("Password invalid.");
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Votre mot de passe doit contenir au minimum 8 caractères.',
        buttons: ['Ok']
      });
      alert.present();
    }
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.mail) &&
      this.password.length >= 8) {


      this.http.post(this.globals.variables.urls.checkMailURL, {"mail":this.mail}, {})
        .then(data => {
          let res = JSON.parse(data.data);
          console.log(res);
          console.log(res.status);
          if (res.status == 'ok') {
            let gc = GeneralcndPage;
            this.navCtrl.push(gc, {
              pseudo: this.pseudo,
              job: this.job,
              mail: this.mail,
              password: this.password,
              address: this.address
            });
          }
          else if (res.status == 'non-ok') {
            let alert = this.alertCtrl.create({
              title: 'Information',
              subTitle: 'Cet email possède déjà un compte.',
              buttons: ['Ok']
            });
            alert.present();
          }
          console.log(JSON.stringify(data.data));
        }, error => {
          console.log(JSON.stringify(error));
        });

    }
    else {
      console.log("Mail invalid.");
    }

  }

  public emailTyping() {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.mail)) {
      console.log("Mail valid.");
    }
    else {
      console.log("Mail invalid.");
    }
  }

}
