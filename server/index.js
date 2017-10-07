process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var app = require('express').createServer();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//require('ssl-root-cas').inject();
var request = require('sync-request');
var jazz = require("./jazz/jazz_api.js");
var telenor = require("./telenor/telenor_api.js");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res) {
	res.send("Hello World");
});

app.post('/merchantpayment/jazz',function(req,res) {
	res.send(jazz.merchant_payment(req.body));
});

app.get('/billpayment/telenor',function(req,res) {
	console.log("listening on 3000 for merchantpayment/telenor");
	
	res.send(telenor.bill_payment());
});

app.get('/merchantpayment/telenor',function(req,res) {
	console.log("listening on 3000 for merchantpayment/telenor");
	
	res.send(telenor.merchant_payment());
});

app.get('/getcompanieslist',function(req,res) {
	console.log("listening on 3000 for getcompanieslist");
	
	res.send(telenor.get_companies_list());
});


app.listen(process.env.PORT || 3000,function(){
	console.log("listening on 3000");
});
