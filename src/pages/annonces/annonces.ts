import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AnnoncesFilterPage } from '../annonces-filter/annonces-filter';
import { AnnonceAdd1Page } from '../annonce-add1/annonce-add1';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';

/**
 * Generated class for the AnnoncesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-annonces',
  templateUrl: 'annonces.html',
})
export class AnnoncesPage {

  load: number = 1;

  map: any;
  user: any;
  listCat: any = [];
  listAds: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private http: HTTP,
    private globals: GlobalsProvider
  ) {

    this.user = navParams.get('user');
    console.log(JSON.stringify(this.user));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoncesPage');
    this.loadMap();
    
  }

  ionViewWillEnter(){
    this.getListCat();
    this.getListAds();
  }

  public loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 48.864716, lng: 2.349014 },
      zoom: 15
    });
    // Premier marker
    let image = {
      url: '../../assets/imgs/da_image/map-marker-fa-01.png',
      // This marker is 20 pixels wide by 32 pixels high.
      scaledSize: new google.maps.Size(40, 40),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 0)
    };
    let marker1 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: image
    });
    let content1 = "<h4 style=\"color: black;\">Map center!</h4>";

    // Deuxieme marker
    let marker2 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: 'blue'
    });
    let content2 = "<h4 style=\"color: black;\">Information!</h4>";


    this.addInfoWindow(marker1, content1);
  }

  public addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  public filter() {
    let filter = this.modalCtrl.create(AnnoncesFilterPage);
    filter.present();
  }

  public newAnnonce() {
    let faq1 = AnnonceAdd1Page;
    this.navCtrl.push(faq1, {
      user: this.user,
      listCat: this.listCat
    });
  }

  public getListCat() {
    //document.getElementById('load').style.display = 'inline';
    this.http.post(this.globals.variables.urls.listAnnonceCat, {}, {})
      .then(
        data => {
          this.listCat = JSON.parse(data.data);
          console.log(JSON.stringify(this.listCat));
        },
        error => {
          console.log(JSON.stringify(error));
        }
      );
  }

  public getListAds() {
    //document.getElementById('load').style.display = 'inline';
    this.http.post(this.globals.variables.urls.listAnnonce, {}, {})
      .then(
        data => {
          this.load = 0;
          this.listAds = JSON.parse(data.data);
          console.log(JSON.stringify(this.listAds));
        },
        error => {
          this.load = 0;
          console.log(JSON.stringify(error));
        }
      );
  }

}
