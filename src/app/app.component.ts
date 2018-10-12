import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DentartPage } from '../pages/dentart/dentart';
import { Createacc1Page } from '../pages/createacc1/createacc1';
import { Createacc2Page } from '../pages/createacc2/createacc2';
import { Createacc3Page } from '../pages/createacc3/createacc3';
import { Createacc4Page } from '../pages/createacc4/createacc4';
import { GeneralcndPage } from '../pages/generalcnd/generalcnd';
import { ConnexionPage } from '../pages/connexion/connexion';
import { RecoverpasswdPage } from '../pages/recoverpasswd/recoverpasswd';
import { PopupcertPage } from '../pages/popupcert/popupcert';
import { FaqcomPage } from '../pages/faqcom/faqcom';
import { FaqdetailPage } from '../pages/faqdetail/faqdetail';
import { FaqfilterPage } from '../pages/faqfilter/faqfilter';
import { Faqadd1Page } from '../pages/faqadd1/faqadd1';
import { Faqadd2Page } from '../pages/faqadd2/faqadd2';
import { Faqadd3Page } from '../pages/faqadd3/faqadd3';
import { Faqadd4annulerPage } from '../pages/faqadd4annuler/faqadd4annuler';
import { AnnoncesPage } from '../pages/annonces/annonces';
import { AnnoncesFilterPage } from '../pages/annonces-filter/annonces-filter';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = DentartPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {

    this.initializeApp();

    this.pages = [
      { title: 'FaQ', component: HomePage },
      { title: 'Annoces', component: AnnoncesPage },
      { title: 'Formations', component: HomePage },
      { title: 'À savoir', component: HomePage },
      { title: 'Mes alertes', component: HomePage }
    ]
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
    this.nav.setRoot(page.component);
  }

  public logOut(){
    let da = DentartPage;
    this.nav.setRoot(da);
  }

}

