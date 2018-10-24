import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Faqadd2Page } from '../faqadd2/faqadd2';
import { AnnonceAdd1Page } from '../annonce-add1/annonce-add1';
import { AnnonceAddAnnulerPage } from '../annonce-add-annuler/annonce-add-annuler';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AnnonceCatPage } from '../annonce-cat/annonce-cat';

/**
 * Generated class for the AnnonceAdd2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-annonce-add2',
  templateUrl: 'annonce-add2.html',
})
export class AnnonceAdd2Page {

  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  zone: NgZone = new NgZone({ enableLongStackTrace: true });

  imgs: any = [];
  img1: any;
  user: any;

  ad_title: any = "";
  ad_description: any = "";
  ad_address: any = "";
  full_ad_address: any = "";
  cat_ad: "";
  price: "";
  phone: "";

  listCat: any = [];
  selectedCat: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private http: HTTP,
    private globals: GlobalsProvider
  ) {

    let img1 = navParams.get('img');
    this.user = navParams.get('user');
    this.listCat = navParams.get('listCat');
    //console.log(JSON.stringify(img1));
    this.imgs.push(img1);

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnonceAdd2Page');
  }

  public showRPC() {
    let rpc = this.modalCtrl.create(Faqadd2Page);
    rpc.onDidDismiss(data => {
      console.log(JSON.stringify(data));
    });
    rpc.present();
  }

  public addPhoto(img) {
    let newphoto = this.modalCtrl.create(AnnonceAdd1Page, {
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
    else if (img == 3 && this.imgs.length >= 4) {
      this.imgs.splice(3, 1);
      //this.imgs = this.imgs.values();
    }
    else {
      newphoto.onDidDismiss(data => {
        if (data != null)
          this.imgs.push(data);
        //console.log(JSON.stringify(data));
      });
      newphoto.present();
    }

  }

  public annulerClick() {
    let confirm = this.modalCtrl.create(AnnonceAddAnnulerPage);
    confirm.present();
  }

  public publier() {
    if (this.ad_title != '' && this.ad_description != '' && this.selectedCat != null) {
      this.http.post(this.globals.variables.urls.addAnnonce,
        {
          "ad_title": this.ad_title,
          "ad_description": this.ad_description,
          "ad_address": this.ad_address,
          "full_ad_address": this.full_ad_address,
          "user_id": this.user.id_User,
          "cat_ad": this.selectedCat.id,
          "price": this.price,
          "phone": this.phone
        },
        {})
        .then(
          data => {
            let id_ad = JSON.parse(data.data).id;
            if (this.imgs.length > 0) {
              for (let i = 0; i < this.imgs.length; i++) {
                this.http.uploadFile(this.globals.variables.urls.uploadAnnonceIMG,
                  {
                    "ad_id": "" + id_ad,
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

    else {
    }
  }

  public changeCat() {

    let cat = AnnonceCatPage;
    let catModal = this.modalCtrl.create(cat, {
      listCat: this.listCat
    });
    catModal.onDidDismiss(data => {
      this.selectedCat = data;
      console.log(JSON.stringify(this.selectedCat));
    });
    catModal.present();

  }

  updateSearchResults() {
    console.log("Typing");
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        if (predictions != null) {
          this.autocompleteItems = [];
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }

        console.log(this.autocompleteItems);
      });
  }

  public selectSearchResult(item) {
    console.log(JSON.stringify(item));
    this.full_ad_address = JSON.stringify(item);
    this.ad_address = item.description;
    this.autocomplete.input = item.description;
    this.autocompleteItems = [];
  }

}
