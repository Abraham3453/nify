import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { RecoverpasswdPage } from '../recoverpasswd/recoverpasswd';

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

  email: any;
  passwd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

  public connect(){
    let home = HomePage;
    this.navCtrl.push(home);
  }

  public changeMail(event){

    let value = event.target.value;
    
  }

  public forgetPasswd(){
    let recov = RecoverpasswdPage;
    this.navCtrl.push(recov);
  }

}
