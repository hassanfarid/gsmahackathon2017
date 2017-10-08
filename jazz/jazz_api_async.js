var request = require('request');
var sync_request = require('sync-request');

var options_merchant_payment = { method: 'POST',
  url: 'https://developer.jazzcash.com.pk/v1.1/mm/transactions/merchantpayment',
  headers: 
   { 'postman-token': '0c00f50e-1fd7-856b-eff3-99efc8a99577',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: 'Bearer 6b3b9c2d-f2f7-3eb2-af15-ccdf30f55652',
     'request-date': '2017-09-14T4:15:19.969Z',
     'x-correlation-id': '1ds1d2d',
     accept: 'application/json' },
  body: 
   { amount: '1.00',
     currency: 'PKR',
     type: 'merchantpay',
     subType: 'merchantpay',
     descriptionText: 'string',
     requestDate: 'string',
     requestingOrganisationTransactionReference: 'string',
     oneTimeCode: 'string',
     geoCode: 'string',
     debitParty: [ { key: 'msisdn', value: '03092795229' } ],
     creditParty: [ { key: 'storeid', value: '00132946' } ],
     senderKyc: 
      { nationality: 'string',
        dateOfBirth: 'string',
        occupation: 'string',
        employerName: 'string',
        contactPhone: 'string',
        gender: 'string',
        idDocument: 
         [ { idType: 'string',
             idNumber: 'string',
             issueDate: 'string',
             expiryDate: 'string',
             issuer: 'string',
             issuerPlace: 'string',
             issuerCountry: 'string',
             otherIdDescription: 'string' } ],
        postalAddress: 
         { addressLine1: 'string',
           addressLine2: 'string',
           addressLine3: 'string',
           city: 'string',
           stateProvince: 'string',
           postalCode: 'string',
           country: 'string' },
        subjectName: 
         { title: 'string',
           firstName: 'string',
           middleName: 'string',
           lastName: 'string',
           fullName: 'string',
           nativeName: 'string' },
        emailAddress: 'string',
        birthCountry: 'string' },
     recipientKyc: 
      { nationality: 'string',
        dateOfBirth: 'string',
        occupation: 'string',
        employerName: 'string',
        contactPhone: 'string',
        gender: 'string',
        idDocument: 
         [ { idType: 'string',
             idNumber: 'string',
             issueDate: 'string',
             expiryDate: 'string',
             issuer: 'string',
             issuerPlace: 'string',
             issuerCountry: 'PK',
             otherIdDescription: 'string' } ],
        postalAddress: 
         { addressLine1: 'string',
           addressLine2: 'string',
           addressLine3: 'string',
           city: 'string',
           stateProvince: 'string',
           postalCode: 'string',
           country: 'string' },
        subjectName: 
         { title: 'string',
           firstName: 'string',
           middleName: 'string',
           lastName: 'string',
           fullName: 'string',
           nativeName: 'string' },
        emailAddress: 'string',
        birthCountry: 'string' },
     originalTransactionReference: 'string',
     servicingIdentity: 'string',
     requestingLei: 'string',
     receivingLei: 'string',
     metadata: [ { key: 'string', value: 'string' } ],
     transactionStatus: 'string',
     internationalTransferInformation: 
      { originCountry: 'string',
        quotationReference: 'string',
        quoteId: 'string',
        receivingCountry: 'string',
        remittancePurpose: 'string',
        relationshipSender: 'string',
        deliveryMethod: 'string' } },
  json: true };
var options_bill_payment = { method: 'POST',
  url: 'https://developer.jazzcash.com.pk/v1.1/mm/accounts/msisdn/03092795228/bills/10593039/payments',
  headers: 
   { 'postman-token': 'f9a8f7fc-16ad-f8d9-ff65-497b898f1543',
     'cache-control': 'no-cache',
     authorization: 'Bearer 6b3b9c2d-f2f7-3eb2-af15-ccdf30f55652',
     'x-user-credential-1': 'aGFzc2FuLnNldGhAZ21haWwuY29tQDAzMDkyNzk1MjI4OjU2ZHhNcWxmMUU4PQ==',
     'request-date': '2017-09-14T4:15:19.969Z',
     'x-correlation-id': 'nsknk4sdddsd1',
     accept: 'application/json',
     'content-type': 'application/json' },
  body: 
   { currency: 'PKR',
     paidAmount: '100.00',
     customerReference: 'string',
     paymentType: 'payment',
     supplementaryBillReferenceDetails: 
      [ { paymentReferenceType: 'CompanyCode',
          paymentReferenceValue: '71' } ] },
  json: true };
var options_3DESencrypt = { method: 'POST',
  url: 'https://developer.jazzcash.com.pk/v1.1/utilities/3DESencrypt',
  headers: 
   { 'postman-token': '8f96a009-169d-9c50-7ded-3bdba4be8562',
     'cache-control': 'no-cache',
     authorization: 'Bearer 6b3b9c2d-f2f7-3eb2-af15-ccdf30f55652',
     accept: 'application/json',
     'content-type': 'application/json' },
  body: { Value: '4321' },
  json: true };

module.exports = {
  merchant_payment: function (req, res) {
      var options = options_merchant_payment;
      options.body.debitParty[0].value = req.msisdn;
      options.body.creditParty[0].value = req.merchantid;
      options.body.amount = req.amount;
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
          res.send(body);
        });
  },
  bill_payment: function (req, res) {
      var options = options_3DESencrypt;
      options.body.Value = req.mpin;
      var api_request = sync_request(options.method, options.url, {'headers': options.headers, 'json': options.body});
      var response = JSON.parse(api_request.getBody('utf8'));
      var empin = response["Encrypted MPIN"];
      var input = "hassan.seth@gmail.com@" + req.msisdn + ":" + empin;
      var base64 = Buffer(input).toString('base64');
      
      options = options_bill_payment;
      options.headers['x-user-credential-1'] = base64;
      options.body.paidAmount = req.amount;
      options.body.supplementaryBillReferenceDetails[0].paymentReferenceValue = req.companycode;
      options.body.paymentType = req.paymenttype;
      options.url.replace = options.url.replace('10593039', req.billreference);
      options.url.replace = options.url.replace('03092795228', req.msisdn);
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
          res.send(body);
        });
  }
};
