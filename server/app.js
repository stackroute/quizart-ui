var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var addChallenge = require('../routes/addChallenge.js');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname ,'../client')));
app.get('/',function(req,res){
 res.sendFile(path.join(__dirname,'/index.html'));
})

app.get('/test', function(req,res) {
 res.send('testing')
})
app.use(function(req,res,next)
{
 res.header('Access-Control-Allow-Origin',"*");
 res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
 res.header('Access-Control-Allow-Headers','Content-Type');
 next();
});

app.use('/newChallenge',addChallenge);
app.listen(8080, function () {
 console.log('Example app listening on port 8081!');
});