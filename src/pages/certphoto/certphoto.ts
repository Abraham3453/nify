import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ViewController } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Faqadd3Page } from '../faqadd3/faqadd3';

/**
 * Generated class for the CertphotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certphoto',
  templateUrl: 'certphoto.html',
})
export class CertphotoPage {

  listImage: any = [];
  selectedImg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private ptf: Platform,
    private transfer: FileTransfer,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController
  ) {

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
    console.log('ionViewDidLoad CertphotoPage');
    this.getImagesGalerie();
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
                    this.selectedImg=this.listImage[0];
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

  public dismiss(){
    this.viewCtrl.dismiss(this.selectedImg);
  }

}
