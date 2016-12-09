var async = require("async/each");
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var wdk = require('wikidata-sdk');
var subjectList=[];
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/generateSubject', function(req, res, next) {
  console.log("generate");
  var pIdForVariable=req.body.pIdForSubject;
  var qIDForVariable=req.body.qIDForSubject;
  var sparql = `
  SELECT  ?variableLabel
  WHERE { ?variable wdt:${pIdForVariable} wd:${qIDForVariable} .
        SERVICE wikibase:label {
  		bd:serviceParam wikibase:language "en" .
  	}

  }LIMIT 5
  `
  var url = wdk.sparqlQuery(sparql);
  var tempArr=[];
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if(res.body===null){
        res.body = JSON.parse(res.text);
      }
      for(var arrayItem in res.body.results.bindings)
      {
        for(var value in res.body.results.bindings[arrayItem])
        {
          subjectList.push(res.body.results.bindings[arrayItem][value].value);
        }
      }
      async.each(subjectList, saveFile, function(err){
      });
      async.each(subjectList, function(searchString, callback) {
      searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&limit=5&indent=True';
      request(searchUri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
              tempArr.push(body);
          }
      })
      callback(res.send(tempArr));
    }, function(err) {
    if( err ) {
      console.log('Failed to process');
    } else {
      console.log('Success');
    }
  });
    }
  });
});
module.exports = router;
