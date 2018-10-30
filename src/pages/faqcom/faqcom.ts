import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, ModalController, Events } from 'ionic-angular';
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
    private modalCtrl: ModalController,
    private events: Events
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
      //console.log(JSON.stringify(data));
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
            let res = JSON.parse(data.data);
            //console.log(JSON.stringify(data));
            if(res.comment){
              console.log(JSON.stringify(res.comment));
              let com = {
                data: res.comment,
                author_infos: this.user
              }
              //this.faq.faq.coms.push(com);
              this.events.publish("new:com", {
                faq_id: this.faq.faq.id,
                com: com
              });
            }
            this.faq_comment = "";
            console.log(this.faq_comment);
            this.img = null;
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
            let res = JSON.parse(data.data);
            if(res.comment){
              let com = {
                data: res.comment,
                author_infos: this.user
              }
              console.log(JSON.stringify(res.comment));
              //this.faq.faq.coms.push(com);
              this.events.publish("new:com", {
                faq_id: this.faq.faq.id,
                com: com
              });
            }
            this.faq_comment = "";
            console.log(this.faq_comment);
          },
          error => {
            console.log(JSON.stringify(error));
          }
        );
    }

  }

}
