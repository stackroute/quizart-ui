var express = require('express');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'))
console.log("server is running")
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users/login',require('./controller/index.js'));
app.use('/',require('./controller/index.js'));
app.use('/signin',require('./controller/index.js'));
app.listen('8081',function(){
});
