import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { RecoverpasswdPage } from '../recoverpasswd/recoverpasswd';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  mail: string = '';
  password: string = '';
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HTTP,
    private globals: GlobalsProvider,
    private alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  public connect() {

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

      this.http.post(this.globals.variables.urls.loginURL,
        {
          "mail": this.mail,
          "password": this.password
        }, {})
        .then(data => {
          let res = JSON.parse(data.data);
          //console.log(res);
          //console.log(res.etat_inscription);
          
          if (res.etat_connexion == 'connexion-ok') {
            this.user = res.info_utilisateur;
            let home = HomePage;
            this.navCtrl.setRoot(home, {
              user: this.user
            },
            {
              animate: true,
              animation: 'ios-transition',
              direction: 'forward',
              duration: 500
            });
          }
          else if (res.etat_connexion == 'non-ok') {
            let alert = this.alertCtrl.create({
              title: 'Information',
              subTitle: 'Votre email ou mot de passe est incorrect.',
              buttons: ['Ok']
            });
            alert.present();
          }
          //console.log(JSON.stringify(data.data));
        }, error => {
          console.log(JSON.stringify(error));
        });

    }

  }

  public changeMail(event) {

    let value = event.target.value;

  }

  public forgetPasswd() {
    let recov = RecoverpasswdPage;
    this.navCtrl.push(recov);
  }

}
