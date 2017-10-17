import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ScanQrPage } from '../scan-qr/scan-qr';
import { GenerateQrPage} from '../generate-qr/generate-qr' ;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private scanQrPage: ScanQrPage;
  private generateQrPage: GenerateQrPage;

  constructor(public navCtrl: NavController) {
  }

  payMerchant() {
    this.navCtrl.push(ScanQrPage);
  }

  receiveAmount() {
    this.navCtrl.push(GenerateQrPage);
  }

}
