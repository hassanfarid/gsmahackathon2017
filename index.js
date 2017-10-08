process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var app = require('express').createServer();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//require('ssl-root-cas').inject();
var request = require('sync-request');
var jazz = require("./jazz/jazz_api.js");
var telenor = require("./telenor/telenor_api.js");

var jazz_async = require("./jazz/jazz_api_async.js");
var telenor_async = require("./telenor/telenor_api_async.js");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res) {
	res.send("Hello World");
});

app.post('/merchantpayment/jazz',function(req,res) {
	console.log(req.body);
	jazz_async.merchant_payment(req.body, res);
});
app.post('/billpayment/jazz',function(req,res) {
	jazz_async.bill_payment(req.body, res);
});

app.get('/getcompanieslist',function(req,res) {
	console.log("listening on 3000 for getcompanieslist");
	
	telenor_async.get_companies_list(res);
});

app.post('/billinquiry',function(req, res) {
	console.log("listening on 3000 for billinquiry");
	
	telenor_async.bill_inquiry(req.body, res);
});

app.post('/billpayment/telenor',function(req,res) {
	console.log("listening on 3000 for billpayment/telenor");
	
	telenor_async.bill_payment(req.body, res);
});

app.post('/merchantpayment/telenor',function(req, res) {
	console.log("listening on 3000 for merchantpayment/telenor");
	
	telenor_async.merchant_payment(req.body, res);
});

app.post('/moneytransfertoMA/telenor',function(req,res) {
	console.log("listening on 3000 for moneytransfertoMA/telenor");
	
	telenor_async.money_transfer_to_MA(req.body, res);
});

app.post('/moneytransfertobank/telenor',function(req,res) {
	console.log("listening on 3000 for moneytransfertobank/telenor");
	
	telenor_async.money_transfer_to_bank(req.body, res);
});

app.post('/sendmoneytoMA/telenor',function(req,res) {
	console.log("listening on 3000 for sendmoneytoMA/telenor");
	
	telenor_async.send_money_to_MA(req.body, res);
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = app.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});
