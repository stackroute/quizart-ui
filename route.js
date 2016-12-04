var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/users/login',require('./controller/index.js'));
//app.use(express.static('./client/views'));

//app.route('/users/login')login

// app.all('*', function(req, res, next) {
//  console.log("router");
//  res.header('Access-Control-Allow-Origin', 'true');
//  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//  if (req.method == 'OPTIONS') {
//    console.log("request in route");
//    res.status(200).end();
//  } else {
//    next();
//  }
// });

app.listen('8081',function(){

});
