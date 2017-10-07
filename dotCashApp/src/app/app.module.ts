import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ScanQrPage } from '../pages/scan-qr/scan-qr';
import { GenerateQrPage } from '../pages/generate-qr/generate-qr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Dialogs } from '@ionic-native/dialogs';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ScanQrPage,
    GenerateQrPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    NgxQRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ScanQrPage,
    GenerateQrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Dialogs,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
