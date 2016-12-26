var express = require('express');
var router = express.Router();
var request = require('request');


router.post('/gameProvisioner/:jwtToken',function(req,res){
  console.log("in provisoner");
  var userToken = req.params.jwtToken;
  console.log(userToken);
});

module.exports = router;
