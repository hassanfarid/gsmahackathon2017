var request = require('sync-request');

var generate_token = function () {
    console.log("called generate_token");
    var options = { method: 'POST',
      url: 'https://api.telenor.com.pk/oauthtoken/v1/generate?grant_type=client_credentials',
      qs: { grant_type: 'client_credentials' },
      headers: 
       { 'postman-token': '5d090c41-033c-e18b-0c48-854548ea0e81',
         'cache-control': 'no-cache',
         authorization: 'Basic U2VNS2xUYXo2OXBJN2twWWNQOWRuSmZPVkt0QnRhckQ6c0cwQnhBbWxiNHpXbGcwaQ==' } };
     
    var api_request = request(options.method, options.url, {'headers': options.headers}, {'json': options.body});
            
    return JSON.parse(api_request.getBody('utf8')).access_token;
    };

var get_companies_list = function () {
    console.log("called get_companies_list");
    var token = generate_token();
    
    var api_request = request('GET', 'https://api.telenor.com.pk/v1.1/mm/billcompanies', {
      headers: 
	   { 'postman-token': '146b2c06-a2db-b44f-7def-7c17ee05e74b',
	     'cache-control': 'no-cache',
	     'x-user-credential-1': 'Z3NtYXVzZXI6VCo1Jm5NOSM=',
	     'x-channel': 'gsma1',
	     'x-api-key': 'TelenorAPIGW',
	     authorization: 'Bearer ' + token }
    });
    return api_request.getBody('utf8');
  };

var merchant_payment = function () {
    console.log("called merchant_payment");
    var token = generate_token();
    
    var options = { method: 'POST',
          url: 'https://api.telenor.com.pk/debitma/v1.1/mm/transactions',
          headers: 
           { 'postman-token': '88a01a54-c526-b58e-7afb-3fbe344a470f',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             'x-user-credential-1': 'SGFja2F0aG9uOjEyYmNlMzc0ZTdiZTE1MTQyZTgxNzJmNjY4ZGEwMGQ4',
             'x-channel': 'gsmamerchant',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token },
          body: 
           { "amount": "1.00",
             "currency": "PKR",
             "type": "merchantpay",
             "subType": "debitMA",
             "requestDate": "2017-08-16T11:32:03.449Z",
             "debitParty": [ { "key": "msisdn", "value": "923448741087" } ],
             "creditParty": [ { "key": "storeid", "value": "6978" } ],
             "senderKyc": { "emailAddress": "abc@xyz.com" },
             "requestingOrganisationTransactionReference": "1234567" }
             };
  
    var api_request = request(options.method, options.url, {'headers': options.headers, 'json': options.body});
    return api_request.getBody('utf8');
};

var bill_payment = function () {
    console.log("called bill_payment");
    var token = generate_token();
    
    var options = { method: 'POST',
          url: 'https://api.telenor.com.pk/v1.1/mm/accounts/msisdn@923448741087/bills/0/payments',
          headers: 
           { 'postman-token': '7f19867a-ae09-d665-9fad-e64b287e6a20',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             'x-user-credential-1': 'Nzc3OEA5MjM0NDg3NDEwODc6NTQzMjE=',
             'x-channel': 'gsmamerchant',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token },
          body: 
           { currency: 'PKR',
             paidAmount: '1.00',
             supplementaryBillReferenceDetails: 
              [ { paymentReferenceType: 'consumerno',
                  paymentReferenceValue: '0095830000' },
                { paymentReferenceType: 'billcompany',
                  paymentReferenceValue: 'gas_ssgc.sp' } ] },
          json: true };
    
    var api_request = request(options.method, options.url, {'headers': options.headers, 'json': options.body});
    return api_request.getBody('utf8');
};

module.exports = {
  generate_token: generate_token, 
  get_companies_list: get_companies_list,
  merchant_payment: merchant_payment,
  bar: function () {
    // whatever
  }
};
