import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServiceProvider } from '../service/service';

/*
  Generated class for the TelenorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TelenorServiceProvider extends ServiceProvider {

  const providerName = "EasyPaisa";

  constructor(public http: Http) {
    super();
  }

  getUserid() { return "923448741087"; }

  billInquiry(payload) {
    const serviceURL = 'billinquiry';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);

  }

  getCompaniesList() {
    const serviceURL = 'getcompanieslist';
    return this.http
      .get(this.baseURL + serviceURL)
      .map(res => res.json())
      .catch(this.handleError);

  }

  doMerchantPayment(payload) {
    var provider = this.getProvider(providerName, payload);
    var body = {
      msisdn: getUserid(),
      amount: payload.amount,
      currency: "PKR",
      email: "asy@gmail.com",
      storeid: provider.storeid
    };
    const serviceURL = 'merchantpayment/telenor';
    return this.http
      .post(this.baseURL + serviceURL, body)
      .map(res => res.json())
      .catch(this.handleError);

  }

  doBillPayment(payload) {
    var provider = this.getProvider(providerName, payload);
    var body = {
      amount: payload.amount,
      msisdn: getUserid(),
      billcompany: provider.companycode,
      consumerno: provider.billref,
      currency: "PKR"
    };
    const serviceURL = 'billpayment/telenor';
    return this.http
      .post(this.baseURL + serviceURL, body)
      .map(res => res.json())
      .catch(this.handleError);
  }

  doMoneyTransferToMA(payload) {
    const serviceURL = 'moneytransfertoMA/telenor';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);

  }

  doMoneyTransferToBank(payload) {
    const serviceURL = 'moneytransfertobank/telenor';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);

  }

  topUpMa(payload) {
    const serviceURL = 'sendmoneytoMA/telenor';
    return this.http
      .post(this.baseURL + serviceURL, payload)
      .map(res => res.json())
      .catch(this.handleError);

  }

}
