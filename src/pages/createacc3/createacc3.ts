import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Createacc4Page } from '../createacc4/createacc4';

declare var google;

@IonicPage()
@Component({
  selector: 'page-createacc3',
  templateUrl: 'createacc3.html',
})


//https://ionicthemes.com/tutorials/about/ionic-2-google-maps-google-places-geolocation
export class Createacc3Page {

  map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  zone: NgZone = new NgZone({ enableLongStackTrace: true });

  address: string = '';
  pseudo: string = '';
  job: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private alertCtrl: AlertController
  ) {

    this.pseudo = navParams.get('pseudo');
    this.job = navParams.get('job');
    console.log(this.pseudo);
    console.log(this.job);

    this.getCurentPosition();
    this.watchPosition();

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Createacc3Page');
  }

  public getCurentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Curent position');
      console.log(resp);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
      console.log(JSON.stringify(error));
    });
  }

  public watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log("Watching Position");
      console.log(JSON.stringify(data));
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
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
    this.address = JSON.stringify(item);
    this.autocomplete.input = item.description;
    this.autocompleteItems = [];
  }

  public precedent() {
    this.navCtrl.pop();
  }

  public nextStep() {
    if (this.address != null && this.address != '') {
      let caccn = Createacc4Page;
      this.navCtrl.push(caccn, {
        pseudo: this.pseudo,
        job: this.job,
        address: this.address
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Indiquez votre adresse.',
        buttons: ['Ok']
      });
      alert.present();
    }

  }

}
