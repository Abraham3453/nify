import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    private http: HTTP,
    private globals: GlobalsProvider
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

  public addComment() {
    this.http.post(this.globals.variables.urls.addCommentFaQ, {
      "faq_id": "" + this.faq.faq.id,
      "user_id": "" + this.user.id_User,
      "faq_comment": ""+this.faq_comment
    }, 
    {})
      .then(
        data => {
          console.log(JSON.stringify(data.data));
          //this.listFaQTheme = JSON.parse(data.data);
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

}
