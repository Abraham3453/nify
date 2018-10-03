import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Createacc4Page } from '../createacc4/createacc4';

declare var google;

@IonicPage()
@Component({
  selector: 'page-createacc3',
  templateUrl: 'createacc3.html',
})



export class Createacc3Page {

  map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  zone: NgZone = new NgZone({enableLongStackTrace: true});

  address: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {

    this.getCurentPosition();
    this.watchPosition();

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc3Page');
    //this.loadMap();
  }

  /* public loadMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
  } */

  public getCurentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Curent position');
      console.log(resp);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log("Wacting Position");
      console.log(data);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  updateSearchResults(){
    console.log("Typing");
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
      console.log(this.autocompleteItems);
    });
  }

  public selectSearchResult(item) {
    console.log(item);
    this.address = item;
    this.autocomplete.input = item.description;
    this.autocompleteItems = [];
  }

  public precedent(){
    this.navCtrl.pop();
  }

  public nextStep(){
    let caccn = Createacc4Page;
    this.navCtrl.push(caccn);
  }

}
