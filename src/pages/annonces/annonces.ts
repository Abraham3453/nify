import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AnnoncesFilterPage } from '../annonces-filter/annonces-filter';

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

  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoncesPage');
    this.loadMap();
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
      scaledSize: new google.maps.Size(30, 40),
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


}
