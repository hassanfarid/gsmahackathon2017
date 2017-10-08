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

  const providerName = "JazzCash";

  getUserid() { return "03092795229"; }

  doMerchantPayment(payload) {
  	var provider = this.getProvider(providerName, payload);
  	var body = {
  		amount: payload.amount,
  		msisdn: getUserid(),
  		merchantid: provider.merchantid
  	};
    const serviceURL = 'merchantpayment/jazz';
    return this.http
      .post(this.baseURL + serviceURL, body)
      .map(res => res.json())
      .catch(this.handleError);

  }

  doBillPayment(payload) {
    const serviceURL = 'billpayment/jazz';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
