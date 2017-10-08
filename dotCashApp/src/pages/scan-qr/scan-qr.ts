import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Dialogs } from '@ionic-native/dialogs';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { TelenorServiceProvider } from '../../providers/telenor-service/telenor-service';
import { JazzServiceProvider } from '../../providers/jazz-service/jazz-service';

/**
 * Generated class for the ScanQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  currentStep = 0;

  result: string = '';
  resultObject: any = {};
  gotError: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private qrScanner: QRScanner, public toastCtrl: ToastController, private androidPermissions: AndroidPermissions,
    private dialogs: Dialogs, private cdref: ChangeDetectorRef,

    private telenorServiceProvider: TelenorServiceProvider,
    private jazzServiceProvider: JazzServiceProvider) {
  }

  ionViewDidLoad() {
    // Optionally request the permission early
    this.startScan();
  }

  startScan() {
    var _component = this;

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            _component.result = text;
            _component.resultObject = JSON.parse(text);

            if (_component.resultObject == null || _component.resultObject.operationType == null) {
              console.log(JSON.stringify(_component.resultObject));
              _component.gotError = true;
              this.toastCtrl.create({
                message: "QR Code is not relevant to DotCash",
                duration: 3000
              }).present();
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            }
            else {
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
              _component.currentStep++; // show Details
              this.cdref.detectChanges();
            }

          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.dialogs.confirm('We need Camera Permission to scan QR Code. Do you want to give permission?', "Permission Required")
            .then(() => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA))
            .catch(e => { console.log(JSON.stringify(e)) });
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.log('Error is', JSON.stringify(e));
        this.dialogs.confirm('We need Camera Permission to scan QR Code. Do you want to give permission?', "Permission Required")
          .then(() => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA))
          .catch(e => { console.log(JSON.stringify(e)) });
      });
  }

  payAmount(selectedProvider: string) {
    if (this.resultObject.operationType == "MerchantPayment") {
      if (selectedProvider == "JazzCash")
        this.jazzServiceProvider.doMerchantPayment(this.resultObject)
          .finally(() => {

          })
          .subscribe((res) => {
            this.toastCtrl.create({
              message: "Merchant Payment is successful",
              duration: 3000
            }).present();
          }, (err) => {
            this.toastCtrl.create({
              message: err,
              duration: 3000
            }).present();
          });
      else if (selectedProvider == "EasyPaisa")
        this.telenorServiceProvider.doMerchantPayment(this.resultObject)
          .finally(() => {

          })
          .subscribe((res) => {
            this.toastCtrl.create({
              message: "Merchant Payment is successful",
              duration: 3000
            }).present();
          }, (err) => {
            this.toastCtrl.create({
              message: err,
              duration: 3000
            }).present();
          });
    }
    else if (this.resultObject.operationType == "Bills") {
      if (selectedProvider == "JazzCash")
        this.jazzServiceProvider.doBillPayment(this.resultObject)
          .finally(() => {

          })
          .subscribe((res) => {
            this.toastCtrl.create({
              message: "Bill Payment is successful",
              duration: 3000
            }).present();
          }, (err) => {
            this.toastCtrl.create({
              message: err,
              duration: 3000
            }).present();
          });
      else if (selectedProvider == "EasyPaisa")
        this.telenorServiceProvider.doBillPayment(this.resultObject)
          .finally(() => {

          })
          .subscribe((res) => {
            this.toastCtrl.create({
              message: "Bill Payment is successful",
              duration: 3000
            }).present();
          }, (err) => {
            this.toastCtrl.create({
              message: err,
              duration: 3000
            }).present();
          });
    }
  }

}
