import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GlobalsProvider } from '../providers/globals/globals';
import { DentartPage } from '../pages/dentart/dentart';
import { Createacc1Page } from '../pages/createacc1/createacc1';
import { Createacc2Page } from '../pages/createacc2/createacc2';
import { Createacc3Page } from '../pages/createacc3/createacc3';
import { Geolocation } from '@ionic-native/geolocation';
import { Createacc4Page } from '../pages/createacc4/createacc4';
import { GeneralcndPage } from '../pages/generalcnd/generalcnd';
import { ConnexionPage } from '../pages/connexion/connexion';
import { RecoverpasswdPage } from '../pages/recoverpasswd/recoverpasswd';
import { PopupcertPage } from '../pages/popupcert/popupcert';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FaqcomPage } from '../pages/faqcom/faqcom';
import { FaqdetailPage } from '../pages/faqdetail/faqdetail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DentartPage,
    Createacc1Page,
    Createacc2Page,
    Createacc3Page,
    Createacc4Page,
    GeneralcndPage,
    ConnexionPage,
    RecoverpasswdPage,
    PopupcertPage,
    FaqcomPage,
    FaqdetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DentartPage,
    Createacc1Page,
    Createacc2Page,
    Createacc3Page,
    Createacc4Page,
    GeneralcndPage,
    ConnexionPage,
    RecoverpasswdPage,
    PopupcertPage,
    FaqcomPage,
    FaqdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalsProvider,
    Geolocation,
    HttpClient
  ]
})
export class AppModule {}
