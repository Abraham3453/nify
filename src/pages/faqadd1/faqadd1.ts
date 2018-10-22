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

    /* file.listDir(file.externalRootDirectory, '')
      .then(res => {
        console.log(JSON.stringify(res));
        res.forEach(value => {
          //console.log(JSON.stringify(value));
        });
      })
      .catch(); */

  }

  ionViewDidLoad() {
    this.getImagesGalerie();
    console.log('ionViewDidLoad Faqadd1Page');
  }

  public selectImage(img) {

    this.selectedImg = img;

    /* if (this.selectedImg.length == 3) {
      const alert = this.alertCtrl.create({
        title: 'Informaton !',
        subTitle: 'Trois photos maximum !',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.selectedImg.push(img);
      console.log(JSON.stringify(img)); */

    // Uploading the image file
    /* const fileTransfer: FileTransferObject = this.transfer.create();
    let options1: FileUploadOptions = {
      fileKey: 'file',
      fileName: img.data.name,
      headers: {}
    }

    fileTransfer.upload(
      this.selectedImg.url,
      'http://192.168.88.156/php/uploadIonic/uploadImg.php',
      options1)
      .then((data) => {
        console.log(JSON.stringify(data));
        if (data.response == 'uploaded')
          alert("success");
      }, (err) => {
        alert("error" + JSON.stringify(err));
      }); */
    //}

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

            /* this.file.copyFile(this.file.applicationDirectory + 'www/assets/imgs/avatar/', value.name,
              baseURL + 'Pictures/', value.name)
              .then(res => {

                this.file.readAsDataURL(baseURL + 'Pictures', res.name)
                  .then(url => {
                    let img = {
                      id: idImg,
                      url: url,
                      data: res
                    };
                    this.listImage.push(img);
                    idImg++;
                    //console.log(url);
                  })
                  .catch(error => {
                    console.log(JSON.stringify(error));
                  });
                //console.log(JSON.stringify(res));

              })
              .catch(error => {
                console.log(JSON.stringify(error));
              }); */
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
        user: this.user
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

  public dismiss(){
    this.viewCtrl.dismiss(this.selectedImg);
  }

}
