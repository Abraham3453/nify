import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AnnoncesPage } from '../annonces/annonces';
import { DentartPage } from '../dentart/dentart';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  pages: Array<{ title: string, component: any }>;

  user: any = {};

  canLeave: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private events: Events,
    private platform: Platform
  ) {

    this.user = navParams.get("user");

    this.pages = [
      { title: 'FaQ', component: HomePage },
      { title: 'Annonces', component: AnnoncesPage },
      { title: 'Formations', component: HomePage },
      { title: 'À savoir', component: HomePage },
      { title: 'Mes alertes', component: HomePage }
    ];

    platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss({ title: '', component: null });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewCanLeave(): boolean {
    return true;
  }

  ionViewWillLeave() {
    //
  }

  openPage(page) {
    this.viewCtrl.dismiss(page);
  }

  public logOut() {
    this.viewCtrl.dismiss({ title: 'Déconnexion', component: null });
  }

  public closeMenu() {
    this.viewCtrl.dismiss({ title: '', component: null });
  }

}
