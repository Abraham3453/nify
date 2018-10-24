import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DentartPage } from '../pages/dentart/dentart';
import { AnnoncesPage } from '../pages/annonces/annonces';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = DentartPage;

  pages: Array<{ title: string, component: any }>;

  user: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private events: Events
  ) {

    this.initializeApp();

    this.pages = [
      { title: 'FaQ', component: HomePage },
      { title: 'Annonces', component: AnnoncesPage },
      { title: 'Formations', component: HomePage },
      { title: 'À savoir', component: HomePage },
      { title: 'Mes alertes', component: HomePage }
    ];

    events.subscribe("user:logedIn", (userIn) => {
      this.user = userIn;
    });
    events.subscribe("user:logedOut", (userOut) => {
      this.user = null;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {
      user: this.user
    });
  }

  public logOut(){
    this.user = null;
    let da = DentartPage;
    this.nav.setRoot(da);
  }

}

