import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, ModalController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';
import { Faqadd1Page } from '../faqadd1/faqadd1';

/**
 * Generated class for the FaqcomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqcom',
  templateUrl: 'faqcom.html',
})
export class FaqcomPage {

  faq: any;
  user: any;
  faq_id: string = "";
  user_id: string = "";
  faq_comment: string = "";
  img: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    private http: HTTP,
    private globals: GlobalsProvider,
    private modalCtrl: ModalController
  ) {

    this.faq = navParams.get('faq');
    this.user = navParams.get('user');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqcomPage');
  }

  public retour() {
    this.navCtrl.pop();
  }

  public takePicture(){
    let newphoto = this.modalCtrl.create(Faqadd1Page, {
      source: 2
    });
    newphoto.onDidDismiss(data => {
      if (data != null)
        this.img = data;
      console.log(JSON.stringify(data));
    });
    newphoto.present();
  }

  public addComment() {

    if (this.img != null) {
      this.http.uploadFile(this.globals.variables.urls.addCommentFaQ,
        {
          "faq_id": "" + this.faq.faq.id,
          "user_id": "" + this.user.id_User,
          "faq_comment": this.faq_comment
        },
        {},
        this.img.data.nativeURL,
        'file')
        .then(
          data => {
            console.log(JSON.stringify(data));
          },
          error => {
            console.log(JSON.stringify(error));
          }
        );
    }
    else {
      this.http.post(this.globals.variables.urls.addCommentFaQ, {
        "faq_id": "" + this.faq.faq.id,
        "user_id": "" + this.user.id_User,
        "faq_comment": ""+this.faq_comment
      }, 
      {})
        .then(
          data => {
            console.log(JSON.stringify(data.data));
          },
          error => {
            console.log(JSON.stringify(error));
          }
        );
    }

  }

}
