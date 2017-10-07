import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServiceProvider } from '../service/service';

/*
  Generated class for the JazzServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JazzServiceProvider extends ServiceProvider{

  constructor(public http: Http) {
    super();
  }

  doBillPayment(payload) {
    const serviceURL = 'billpayment/jazz';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);

  }

  doMerchantPayment(payload) {
    const serviceURL = 'merchantpayment/jazz';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
