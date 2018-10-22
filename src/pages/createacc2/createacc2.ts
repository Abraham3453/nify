import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Createacc3Page } from '../createacc3/createacc3';

/**
 * Generated class for the Createacc2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createacc2',
  templateUrl: 'createacc2.html',
})
export class Createacc2Page {

  classJob: string = 'ok-job';
  jobs: any = [
    'Professionel de la dentisterie',
    'Etudiant en dentisterie',
    'Formateur dentisterie',
    'Autres professions médicales',
    'Autres (Précisez)'
  ];
  pseudo: '';
  job: any;
  otherJob: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {

    this.pseudo = navParams.get('pseudo');
    console.log(this.pseudo);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc2Page');
  }

  public selectProfession(idBtn, idIcon) {
    for (let i = 0; i < 5; i++) {
      document.getElementById('btn' + i).style.fontWeight = '100';
      document.getElementById('icon_btn_' + i).style.display = 'none';
    }
    document.getElementById(idIcon).style.display = 'inline';
    document.getElementById(idBtn).style.fontWeight = 'bold';
    this.job = this.jobs[parseInt(idBtn.charAt(3))];
    if (idBtn == 'btn4') {
      this.classJob = 'other-job';
      this.job = this.otherJob;
    }
    else {
      this.classJob = 'ok-job';
    }
    console.log(this.job);
  }

  public otherJobText(){
    this.job = this.otherJob;
    console.log(this.job);
  }

  public precedent() {
    this.navCtrl.pop();
  }

  public nextStep() {
    if (this.job != null && this.job != '') {
      console.log(this.job);
      let caccn = Createacc3Page;
      this.navCtrl.push(caccn, {
        pseudo: this.pseudo,
        job: this.job
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Chisissez votre profession.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

}
