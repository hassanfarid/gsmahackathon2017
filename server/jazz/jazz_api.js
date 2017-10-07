var request = require('sync-request');
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
module.exports = {
  merchant_payment: function (req) {
      var options = options_merchant_payment;
      options.body.debitParty[0].value = req.msisdn;
      options.body.creditParty[0].value = req.merchantid;
      options.body.amount = req.amount;
      
      var api_request = request(options.method, options.url, {'headers': options.headers, 'json': options.body});
    return api_request.getBody('utf8');
  }
};