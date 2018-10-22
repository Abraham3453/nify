import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';
import { DentartPage } from '../dentart/dentart';

/**
 * Generated class for the GeneralcndPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generalcnd',
  templateUrl: 'generalcnd.html',
})
export class GeneralcndPage {

  pseudo: string = '';
  job: string = '';
  address: string = '';
  mail: string = '';
  password: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private globals: GlobalsProvider
  ) {

    this.job = navParams.get('job');
    this.pseudo = navParams.get('pseudo');
    this.address = navParams.get('address');
    this.mail = navParams.get('mail');
    this.password = navParams.get('password');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralcndPage');
  }

  public precedent(){
    this.navCtrl.pop();
  }

  public goToHome(){
    let home = HomePage;
    this.navCtrl.push(home);
  }

  public signUp(){
    this.http.post(this.globals.variables.urls.createAccountURL, 
      {
        "mail":this.mail,
        "pseudo":this.pseudo,
        "job":this.job,
        "address": JSON.parse(this.address).description,
        "password": this.password,
        "full_address": this.address
      }, {})
        .then(data => {
          let res = JSON.parse(data.data);
          console.log(res);
          console.log(res.etat_inscription);
          if (res.etat_inscription == 'inscription-ok') {
            let home = HomePage;
            this.navCtrl.setRoot(home, {
              user: res.user_data,
              animate: true,
              direction: 'forward'
            });
          }
          console.log(JSON.stringify(data.data));
        }, error => {
          console.log(JSON.stringify(error));
        });
  }

}
