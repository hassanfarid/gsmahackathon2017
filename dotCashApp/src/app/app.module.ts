import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScanQrPage } from '../pages/scan-qr/scan-qr';
import { GenerateQrPage } from '../pages/generate-qr/generate-qr';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Dialogs } from '@ionic-native/dialogs';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ServiceProvider } from '../providers/service/service';
import { TelenorServiceProvider } from '../providers/telenor-service/telenor-service';
import { JazzServiceProvider } from '../providers/jazz-service/jazz-service';
import { HttpFactory } from "../providers/http.factory";
import { InterceptedHttp } from '../providers/http.interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanQrPage,
    GenerateQrPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),

    NgxQRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScanQrPage,
    GenerateQrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Dialogs,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    InterceptedHttp,
    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions]
    },

    ServiceProvider,
    TelenorServiceProvider,
    JazzServiceProvider,
  ]
})
export class AppModule {}
