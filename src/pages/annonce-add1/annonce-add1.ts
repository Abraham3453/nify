import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Faqadd3Page } from '../faqadd3/faqadd3';
import { AnnonceAdd2Page } from '../annonce-add2/annonce-add2';
import { HTTP } from '@ionic-native/http';
import { GlobalsProvider } from '../../providers/globals/globals';

/**
 * Generated class for the AnnonceAdd1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annonce-add1',
  templateUrl: 'annonce-add1.html',
})
export class AnnonceAdd1Page {

  source: any = 1;
  user: any;

  listImage: any = [];
  selectedImg: any;

  listCat: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    
  ) {

    this.user = navParams.get('user');
    this.listCat = navParams.get('listCat');

    this.source = navParams.get('source') != null ? navParams.get('source') : 1;

    //applicationDirectory

    let baseURL = file.externalRootDirectory;
    console.log(baseURL);

    let extURL = file.externalDataDirectory;
    console.log(extURL);

    file.checkDir(baseURL, 'Pictures/')
      .then(res => {
        console.log('Resolves ');
        console.log(JSON.stringify(res));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        file.createDir(baseURL, 'Pictures/', false)
          .then(res => {
            //console.log(JSON.stringify(res));
          })
          .catch(error => {
            console.log(JSON.stringify(error));
          });
      });

  }

  ionViewDidLoad() {
    this.getImagesGalerie();
    console.log('ionViewDidLoad AnnonceAdd1Page');
  }

  public selectImage(img) {

    this.selectedImg = img;

  }

  public getImagesGalerie() {
    let baseURL = this.file.externalRootDirectory;
    console.log(baseURL);

    let extURL = this.file.externalDataDirectory;
    console.log(extURL);

    this.file.listDir(baseURL, 'Pictures/')
      .then((listing) => {
        let idImg = 0;
        listing.forEach(value => {
          console.log(JSON.stringify(value));

          if (value.isFile) {

            this.file.readAsDataURL(baseURL + 'Pictures', value.name)
              .then(url => {
                let img = {
                  id: idImg,
                  url: url,
                  data: value
                };
                this.listImage.push(img);
                idImg++;
                this.selectedImg = this.listImage[0];
                //console.log(url);
              })
              .catch(error => {
                console.log(JSON.stringify(error));
              });


          }

        });



      })
      .catch(ex => {
        console.log('error');
        console.log(JSON.stringify(ex));
      });
  }

  public fermer() {
    this.navCtrl.pop();
  }

  public fermerDismiss() {
    this.viewCtrl.dismiss();
  }

  public nextStep() {
    if (this.selectedImg != null) {
      let faq3 = AnnonceAdd2Page;
      this.navCtrl.push(faq3, {
        img: this.selectedImg,
        user: this.user,
        listCat: this.listCat
      });
    }
    else {
      const alert = this.alertCtrl.create({
        title: 'Informaton !',
        subTitle: 'Sélectionnez à modifier !',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  public dismiss() {
    this.viewCtrl.dismiss(this.selectedImg);
  }

}
