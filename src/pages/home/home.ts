import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, FabContainer, AlertController, Events } from 'ionic-angular';
import { PopupcertPage } from '../popupcert/popupcert';
import { FaqcomPage } from '../faqcom/faqcom';
import { FaqdetailPage } from '../faqdetail/faqdetail';
import { FaqfilterPage } from '../faqfilter/faqfilter';
import { Faqadd1Page } from '../faqadd1/faqadd1';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';
import { MenuPage } from '../menu/menu';
import { AnnoncesPage } from '../annonces/annonces';
import { DentartPage } from '../dentart/dentart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  load: number = 1;
  selectedTheme: any = {};

  image1: string = 'assets/imgs/da_image/Rectangle\ 3.jpg';
  image2: string = 'assets/imgs/da_image/Rectangle-05.jpg';
  image3: string = 'assets/imgs/da_image/Rectangle-03.jpg';

  user: any;
  listFaQ: any = [];
  listFaQSorted: any = [];
  listFaQTheme: any = [];
  commentsByFaQ: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private http: HTTP,
    private alertCtrl: AlertController,
    private globals: GlobalsProvider,
    private events: Events
  ) {

    this.user = navParams.get('user');
    console.log('User : ');
    console.log(JSON.stringify(this.user));

    setTimeout(() => {
      this.presentCert();
    }, 1000);

    this.getListTheme();

    events.subscribe("menu", page => {

    });

    events.subscribe("new:com", data => {
      if (this.listFaQSorted.length > 0) {
        console.log("FaQs is more :");
        for (let i = 0; i < this.listFaQSorted.length; i++) {
          if (this.listFaQSorted[i].faq.id == data.faq_id) {
            console.log("Faq id identique");
            this.listFaQSorted[i].faq.coms.push(data.com);
            this.listFaQSorted[i].faq.comments_count += 1;
          }
        }
      }
    });

  }

  ionViewWillEnter() {
    //this.listFaQ = [];
    //this.listFaQSorted = [];
    //this.getListTheme();
  }

  public openMenu() {
    let menu = this.modalCtrl.create(MenuPage, {
      user: this.user
    });
    menu.onDidDismiss(page => {
      if (page.title == "FaQ") {
        //
      }
      else if (page.title == "Annonces") {
        let adPage = AnnoncesPage;
        this.navCtrl.setRoot(adPage, {
          user: this.user
        },
          {
            animate: true
          });
      }
      else if (page.title == "Formations") {
        //
      }
      else if (page.title == "À savoir") {
        //
      }
      else if (page.title == "Mes alertes") {
        //
      }
      else if (page.title == "Déconnexion") {
        this.events.publish('user:logedOut', this.user);
      }
      else if (page.title == "") {
        //
      }
    });
    menu.present();
  }

  public presentCert() {
    let cert = this.modalCtrl.create(PopupcertPage,
      {
        user: '1'
      });
    cert.onDidDismiss(data => {
      //console.log(data);
    });
    cert.present();
  }

  public comment(faq) {
    let fcom = FaqcomPage;
    this.navCtrl.push(fcom,
      {
        faq: faq,
        user: this.user
      });
  }

  public faqDetails(faq) {
    let fdet = FaqdetailPage;
    this.navCtrl.push(fdet, {
      faq: faq,
      user: this.user
    });
  }

  public showFilter() {
    let filter = this.modalCtrl.create(FaqfilterPage,
      {
        user: this.user,
        theme: this.listFaQTheme,
        title: "Filtres"
      });
    filter.onDidDismiss(data => {
      this.selectedTheme = data;
      console.log("Selected theme :");
      //console.log(JSON.stringify(this.selectedTheme));
      if (this.selectedTheme.id != "") {
        this.sortFaQByFilter();
      } else this.listFaQSorted = this.listFaQ;

    });
    filter.present();
  }

  public sortFaQByFilter() {
    if (this.selectedTheme.id != '') {
      this.listFaQSorted = this.listFaQ.filter(faq => {
        if (faq.theme.id == this.selectedTheme.id) {
          return faq;
        }
      });
    }
    else {
      this.listFaQSorted = this.listFaQ;
    }

  }

  public newPub() {
    let faq1 = Faqadd1Page;
    this.navCtrl.push(faq1, {
      user: this.user,
      theme: this.listFaQTheme
    });
  }

  public getListFaQs() {
    this.http.post(this.globals.variables.urls.listFaQ, {}, {})
      .then(
        data => {
          let res = JSON.parse(data.data);
          if (res.length <= 0) {
            this.load = 0;
          }
          else {
            for (let i = 0; i < res.length; i++) {


              //console.log("================ //////////// =================");
              //console.log();

              if (res[i].comments) {
                let coms = [];
                for (let elem in res[i].comments) {
                  coms.push(res[i].comments[elem]);
                  console.log("Comment : ");
                  //console.log(JSON.stringify(res[i].comments[elem]));
                }

                //console.log(coms.length);
                //console.log(JSON.stringify(coms));
                //res[i].comments = coms;
                res[i].comments_count = coms.length;
                res[i].coms = coms;
                //console.log(JSON.stringify(res[i].comments));
                //console.log("Comments found");
                //console.log(res[i]);
              }

              //console.log("================ //////////// =================");

              for (let j = 0; j < this.listFaQTheme.length; j++) {
                if (this.listFaQTheme[j].id == res[i].theme) {

                  let newFaQ = {
                    faq: res[i],
                    theme: this.listFaQTheme[j]
                  }

                  this.getFaQAuthor(res[i].author_id, i, res.length, newFaQ);
                }

              }

            }
          }

        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

  public getListTheme() {
    //document.getElementById('load').style.display = 'inline';
    this.http.post(this.globals.variables.urls.listFaQTheme, {}, {})
      .then(
        data => {
          this.listFaQTheme = JSON.parse(data.data);
          //console.log(this.listFaQTheme);
          //document.getElementById('load').style.display = 'none';
          //this.showRPC();
          this.getListFaQs();
        },
        error => {
          console.log(JSON.stringify(error));
          //document.getElementById('load').style.display = 'none';
          //this.showRPC();
        }
      );
  }

  public getFaQAuthor(author_id, index, listLength, newFaQ) {
    //getUserInfo
    this.http.post(this.globals.variables.urls.getUserInfo, {
      "user_id": "" + author_id
    }, {})
      .then(
        data => {
          newFaQ.author = JSON.parse(data.data).info_utilisateur;
          this.listFaQ.push(newFaQ);
          if (index == listLength - 1) this.load = 0;
          //console.log(JSON.stringify(data.data));
          //console.log(JSON.stringify(this.listFaQ));
          this.listFaQSorted = this.listFaQ;
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

  public addToFavorite(faq) {
    this.http.post(this.globals.variables.urls.addFavorite, {
      "user_id": this.user.id_User != null ? this.user.id_User : this.user.id,
      "post_id": faq.faq.id
    },
      {})
      .then(
        data => {
          let res = JSON.parse(data.data);
          if (res.status == "ok") {
            for (let u = 0; u < this.listFaQ.length; u++) {
              if (this.listFaQ[u].faq.id == faq.faq.id) {
                this.listFaQ.faq.comments_count += 1;
              }
            }
            //faq.faq.comments_count = parseInt(faq.faq.comments_count) + 1;
          }
          //console.log(JSON.stringify(data.data));
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

}
