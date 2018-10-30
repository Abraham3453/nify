import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the FaqfilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqfilter',
  templateUrl: 'faqfilter.html',
})
export class FaqfilterPage {

  theme: any = [];
  selectedTheme: any = {id: "", slug: "", name: ""};
  title: any = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private platform: Platform
  ) {

    this.theme = navParams.get('theme');
    this.title = navParams.get('title');
    platform.registerBackButtonAction(() => {
      this.viewCtrl.dismiss({id: "", slug: "", name: ""});
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqfilterPage');
  }

  public selectFilter(idBtn, idIcon, th){
    console.log(idBtn+ " == " + idIcon);
    if (th == 'all'){
      for (let i = 0; i < this.theme.length; i++) {
        document.getElementById(idBtn).style.fontWeight = '100';
        document.getElementById(idIcon).style.display = 'none';
      }
      document.getElementById(idIcon).style.display = 'inline';
      document.getElementById(idBtn).style.fontWeight = 'bold';
      this.selectedTheme = {
        id: ''
      };
    }
    else {
      for (let i = 0; i < this.theme.length; i++) {
        document.getElementById('btn'+this.theme[i].id).style.fontWeight = '100';
        document.getElementById('icon_btn_'+this.theme[i].id).style.display = 'none';
      }
      document.getElementById(idIcon).style.display = 'inline';
      document.getElementById(idBtn).style.fontWeight = 'bold';
      this.selectedTheme = th;
    } 
    
  }

  public dismiss() {
    this.viewCtrl.dismiss(this.selectedTheme);
  }

}
