import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Faqadd2Page } from '../faqadd2/faqadd2';
import { File } from '@ionic-native/file';
import { Faqadd1Page } from '../faqadd1/faqadd1';
import { Faqadd4annulerPage } from '../faqadd4annuler/faqadd4annuler';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';

/**
 * Generated class for the Faqadd3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqadd3',
  templateUrl: 'faqadd3.html',
})
export class Faqadd3Page {

  imgs: any = [];
  img1: any;
  user: any;

  faq_title: string = '';
  faq_theme: string = '';
  faq_description: string = '';

  listFaQTheme: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private file: File,
    private http: HTTP,
    private globals: GlobalsProvider
  ) {

    let img1 = navParams.get('img');
    this.user = navParams.get('user');
    //console.log(JSON.stringify(img1));
    this.imgs.push(img1);
    this.getListTheme();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Faqadd3Page');
  }

  ionViewWillEnter() {
    //this.getListTheme();
  }

  public showRPC() {
    let rpc = this.modalCtrl.create(Faqadd2Page);
    rpc.onDidDismiss(data => {
      console.log(JSON.stringify(data));
    });
    rpc.present();
  }

  public addPhoto(img) {
    let newphoto = this.modalCtrl.create(Faqadd1Page, {
      source: 2
    });
    if (img == 0 && this.imgs.length >= 1) {
      this.imgs.splice(0, 1);
      //this.imgs = this.imgs.values();
    }
    else if (img == 1 && this.imgs.length >= 2) {
      this.imgs.splice(1, 1);
      //this.imgs = this.imgs.values();
    }
    else if (img == 2 && this.imgs.length >= 3) {
      this.imgs.splice(2, 1);
      //this.imgs = this.imgs.values();
    }
    else {
      newphoto.onDidDismiss(data => {
        if (data != null)
          this.imgs.push(data);
        console.log(JSON.stringify(data));
      });
      newphoto.present();
    }

  }

  public annulerClick() {
    let confirm = this.modalCtrl.create(Faqadd4annulerPage);
    confirm.present();
  }

  public publier() {
    if (this.faq_theme != '' && this.faq_description != '') {
      this.http.post(this.globals.variables.urls.addFaQ,
        {
          "faq_title": "",
          "faq_theme": this.faq_theme,
          "faq_description": this.faq_description,
          "user_id": this.user.id_User
        },
        {})
        .then(
          data => {
            let id_faq = JSON.parse(data.data).id;
            if (this.imgs.length > 0) {
              for (let i = 0; i < this.imgs.length; i++) {
                this.http.uploadFile(this.globals.variables.urls.uploadFaQImg,
                  {
                    "faq_id": "" + id_faq,
                    "num_image": "" + (i + 1)
                  },
                  {},
                  this.imgs[i].data.nativeURL,
                  'file')
                  .then(
                    data => {
                      console.log(JSON.stringify(data));
                      if (i == this.imgs.length - 1) {
                        let home = HomePage;
                        this.navCtrl.setRoot(home, {
                          user: this.user
                        },
                          {
                            animate: true,
                            direction: "forward"
                          });
                      }
                    },
                    error => {
                      console.log(JSON.stringify(error));
                    }
                  );
              }

            }
            console.log(JSON.stringify(data.data));
          },
          error => {
            console.log(JSON.stringify(error));
          }
        );
    }
    /*  */

    //console.log(this.imgs[0].url);
    // faq_id,  num_image,  file
    //http://localhost/php/uploadIonic/uploadImg.php, this.globals.variables.urls.uploadFaQImg
    /* let home = HomePage;
    this.navCtrl.setRoot(home, {}); */
  }

  public changeTheme() {

    console.log(this.faq_theme);
    //this.getListTheme();

  }

  public getListTheme() {
    //document.getElementById('load').style.display = 'inline';
    this.http.post(this.globals.variables.urls.listFaQTheme, {}, {})
      .then(
        data => {
          this.listFaQTheme = JSON.parse(data.data);
          console.log(this.listFaQTheme);
          //document.getElementById('load').style.display = 'none';
          //this.showRPC();
        },
        error => {
          console.log(JSON.stringify(error));
          //document.getElementById('load').style.display = 'none';
          //this.showRPC();
        }
      );
  }

}
