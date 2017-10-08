var request = require("request");
var sync_request = require('sync-request');

var generate_token = function () {
    console.log("called generate_token");
    var options = { method: 'POST',
      url: 'https://api.telenor.com.pk/oauthtoken/v1/generate?grant_type=client_credentials',
      qs: { grant_type: 'client_credentials' },
      headers: 
       { 'postman-token': '5d090c41-033c-e18b-0c48-854548ea0e81',
         'cache-control': 'no-cache',
         authorization: 'Basic U2VNS2xUYXo2OXBJN2twWWNQOWRuSmZPVkt0QnRhckQ6c0cwQnhBbWxiNHpXbGcwaQ==' } };
     
    var api_request = sync_request(options.method, options.url, {'headers': options.headers}, {'json': options.body});
            
    return JSON.parse(api_request.getBody('utf8')).access_token;
    };

var get_companies_list = function (res) {
    console.log("called get_companies_list");
    var token = generate_token();
    
    //console.log(token);
    
    var options = { method: 'GET',
      url: 'https://api.telenor.com.pk/v1.1/mm/billcompanies',
      headers: 
       { 'postman-token': '07bb001c-8e45-00f2-59c5-a2b003b284ea',
         'cache-control': 'no-cache',
         'x-user-credential-1': 'Z3NtYXVzZXI6VCo1Jm5NOSM=',
         'x-channel': 'gsma1',
         'x-api-key': 'TelenorAPIGW',
         authorization: 'Bearer ' + token } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send(body);
    });

  };

var bill_inquiry = function (req, res) {
    console.log("called bill_inquiry");
    var token = generate_token();
    
    var msisdn = req.msisdn || "923448741087", consumerno = req.consumerno || "9329120000", billcompany = req.billcompany || "gas_ssgc.sp";
    
    var options = { method: 'GET',
          url: 'https://api.telenor.com.pk/v1.1/mm/account/msisdn@' + msisdn + '$consumerno@' + consumerno + '$billcompany@' + billcompany + '/bills',
          headers: 
           { 'postman-token': 'dce408a5-bfaa-f8bf-eb2c-4cd65962b4bb',
             'cache-control': 'no-cache',
             'x-user-credential-1': 'Z3NtYXVzZXI6VCo1Jm5NOSM=',
             'x-channel': 'gsma1',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token } };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
          res.send(body);
        });

    };

var bill_payment = function (req, res) {
    console.log("called bill_payment");
    var token = generate_token();
    
    var msisdn = req.msisdn || "923448741087", consumerno = req.consumerno || "9329120000", billcompany = req.billcompany || "gas_ssgc.sp";
    var currency = req.currency || "PKR", amount = req.amount || "1.00";
    
    var options = { method: 'POST',
          url: 'https://api.telenor.com.pk/v1.1/mm/accounts/msisdn@' + msisdn +'/bills/0/payments',
          headers: 
           { 'postman-token': '7eb70fbe-4a2a-1bb8-42e5-19f457bde99e',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             'x-user-credential-1': 'Nzc3OEA5MjM0NDg3NDEwODc6NTQzMjE=',
             'x-channel': 'gsmamerchant',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token },
          body: 
           { currency: currency,
             paidAmount: amount,
             supplementaryBillReferenceDetails: 
              [ { paymentReferenceType: 'consumerno',
                  paymentReferenceValue: consumerno },
                { paymentReferenceType: 'billcompany',
                  paymentReferenceValue: billcompany } ] },
          json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send(body);
    });
};

var merchant_payment = function (req, res) {
    console.log("called merchant_payment");
    var token = generate_token();
    
    var msisdn = req.msisdn || "923448741087",
        amount = req.amount || "1.00",
        currency = req.currency || "PKR",
        email = req.email || "abc@xyz.com",
        storeid = req.storeid || "6978",
        date = new Date().toISOString() || "2017-08-16T11:32:03.449Z";
    
    var options = { method: 'POST',
          url: 'https://api.telenor.com.pk/debitma/v1.1/mm/transactions',
          headers: 
           { 'postman-token': '87669866-d8b1-c02b-f594-b3335f61fc1c',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             'x-user-credential-1': 'SGFja2F0aG9uOjEyYmNlMzc0ZTdiZTE1MTQyZTgxNzJmNjY4ZGEwMGQ4',
             'x-channel': 'gsmamerchant',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token },
          body: 
           { "amount": amount,
             "currency": currency,
             "type": "merchantpay",
             "subType": "debitMA",
             "requestDate": date,
             "debitParty": [ { "key": "msisdn", "value": msisdn } ],
             "creditParty": [ { "key": "storeid", "value": storeid } ],
             "senderKyc": { "emailAddress": email },
             "requestingOrganisationTransactionReference": "1234567" },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
          res.send(body);
        });
};

var money_transfer_to_MA = function (req, res) {
    console.log("called money_transfer_to_MA");
    var token = generate_token();
    
    var from_msisdn = req.from_msisdn || "923448741087",
        to_msisdn = req.to_msisdn || "923448724226",
        amount = req.amount || "1.00",
        currency = req.currency || "PKR",
        date = new Date().toISOString() || "2017-08-16T11:32:03.449Z";
    
    var options = { method: 'POST',
          url: 'https://api.telenor.com.pk/transferMA/v1.1/mm/transactions',
          headers: 
           { 'postman-token': 'ef9db063-6232-27a8-c851-a3dbac4919a5',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             'x-user-credential-1': 'OTIzNDQ4NzQxMDg3OjU0MzIx',
             'x-channel': 'gsma2',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token },
          body: 
           { amount: amount,
             currency: currency,
             type: 'transfer',
             subType: 'MA',
             requestDate: date,
             debitParty: [ { key: 'msisdn', value: from_msisdn } ],
             creditParty: [ { key: 'msisdn', value: to_msisdn } ],
             senderKyc: { Name: 'test1' },
             recipientKyc: { Name: 'test2' } },
          json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send(body);
    });
};

var money_transfer_to_bank = function (req, res) {
    console.log("called money_transfer_to_bank");
    var token = generate_token();
    
    var from_msisdn = req.from_msisdn || "923448741087",
        backaccount_no = req.backaccount_no || "01260144301",
        backaccount_title = req.backaccount_title || "test",
        bank_name = req.bank_name || "bankaccount_scb.sp",
        to_msisdn = req.to_msisdn || "923448724226",
        amount = req.amount || "1.00",
        currency = req.currency || "PKR",
        date = new Date().toISOString() || "2017-08-16T11:32:03.449Z";
    
    var options = { method: 'POST',
          url: 'https://api.telenor.com.pk/transferBank/v1.1/mm/transactions',
          headers: 
           { 'postman-token': '61b922c2-c9d3-856f-44c2-7fa435fdaf50',
             'cache-control': 'no-cache',
             'content-type': 'application/json',
             'x-user-credential-1': 'OTIzNDQ4NzQxMDg3OjU0MzIx',
             'x-channel': 'gsma2',
             'x-api-key': 'TelenorAPIGW',
             authorization: 'Bearer ' + token },
          body: 
           { amount: amount,
             currency: currency,
             type: 'transfer',
             subType: 'Bank',
             requestDate: date,
             debitParty: [ { key: 'msisdn', value: from_msisdn } ],
             creditParty: 
              [ { key: 'bankaccountno', value: backaccount_no },
                { key: 'bankaccounttitle', value: backaccount_title },
                { key: 'bankname', value: bank_name },
                { key: 'msisdn', value: to_msisdn } ],
             senderKyc: { Name: 'test' } },
          json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send(body);
    });
};

var send_money_to_MA = function (req, res) {
    console.log("called send_money_to_MA");
    var token = generate_token();
    
    var from_msisdn = req.from_msisdn || "923448741087",
        to_msisdn = req.to_msisdn || "923448724226",
        nic = req.nic || "3740566859611",
        amount = req.amount || "1.00",
        currency = req.currency || "PKR",
        date = new Date().toISOString() || "2017-08-16T11:32:03.449Z";
    
    var options = { method: 'POST',
      url: 'https://api.telenor.com.pk/otctoma/v1.1/mm/transactions',
      headers: 
       { 'postman-token': '044acad9-923a-4953-20c1-b6ea297ae7b5',
         'cache-control': 'no-cache',
         'content-type': 'application/json',
         'x-user-credential-1': 'Nzc3OEA5MjM0NDg3NDEwODc6NTQzMjE=',
         'x-channel': 'gsmamerchant',
         'x-api-key': 'TelenorAPIGW',
         authorization: 'Bearer ' + token },
      body: 
       { amount: amount,
         currency: currency,
         type: 'transfer',
         subType: 'otcToMa',
         requestDate: date,
         debitParty: [ { key: 'msisdn', value: from_msisdn } ],
         creditParty: [ { key: 'msisdn', value: to_msisdn } ],
         senderKyc: { idDocument: [ { idType: 'nationalidcard', idNumber: nic } ] } },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send(body);
    });
};

module.exports = {
//   generate_token: generate_token, 
  get_companies_list: get_companies_list,
  bill_inquiry: bill_inquiry,
  bill_payment: bill_payment,
  merchant_payment: merchant_payment,
  money_transfer_to_MA: money_transfer_to_MA,
  money_transfer_to_bank: money_transfer_to_bank,
  send_money_to_MA: send_money_to_MA,
  bar: function () {
    // whatever
  }
};
