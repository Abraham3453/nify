import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Faqadd3Page } from '../faqadd3/faqadd3';

/**
 * Generated class for the Faqadd1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqadd1',
  templateUrl: 'faqadd1.html',
})
export class Faqadd1Page {

  source: any = 1;
  user: any;

  listImage: any = [];
  selectedImg: any;
  theme: any;

  //https://ampersandacademy.com/tutorials/ionic-framework-3/upload-image-to-the-php-server-using-ionic-3-file-transfer-and-camera-plugin

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private ptf: Platform,
    private transfer: FileTransfer,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController
  ) {

    console.log(ptf.is('ios'));
    console.log(ptf.is('android'));
    console.log(ptf.is('core'));
    console.log(ptf.is('mobileweb'));
    this.user = navParams.get('user');
    this.theme = navParams.get('theme');

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
    console.log('ionViewDidLoad Faqadd1Page');
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
      let faq3 = Faqadd3Page;
      this.navCtrl.push(faq3, {
        img: this.selectedImg,
        user: this.user,
        theme: this.theme
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

    /* let faq3 = Faqadd3Page;
      this.navCtrl.push(faq3, {
        img: this.selectedImg
      }); */

  }

  public dismiss() {
    this.viewCtrl.dismiss(this.selectedImg);
  }

}
