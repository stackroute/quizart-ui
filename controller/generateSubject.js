var async = require("async");
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var wdk = require('wikidata-sdk');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/generateSubject', function(req, res, next) {
  console.log("in question");
  var pIdForVariable=req.body.pIdForSubject;
  var qIDForVariable=req.body.qIDForSubject;
  var description=req.body.selectedSubjectDescription;
  var sparql = `
  SELECT  ?variableLabel
  WHERE { ?variable wdt:${pIdForVariable} wd:${qIDForVariable} .
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en" .
  }
} LIMIT 1
`
var subjectList=[];
var url = wdk.sparqlQuery(sparql);
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var subjectsJson=JSON.parse(response.body)
    subjectsJson.results.bindings.map(function(item){
      subjectList.push(item.variableLabel.value);
    });
    var results = [],count=0;
    async.each(subjectList, function(searchString, callback1){
      searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&indent=True';
      request(searchUri, function (error, response, body)
      {
        if (!error && response.statusCode == 200)
        {
          var cluesJson=JSON.parse(response.body);
          async.each(cluesJson.itemListElement, function(item, callback2){
            wikipediaUri='https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles='+item.result.name;
            request(wikipediaUri, function (error, response, body)
            {
              if (!error && response.statusCode == 200)
              {
                var clues=JSON.parse(response.body);
                async.each(clues.query.pages, function(index,callback3){
                  if(item.result.hasOwnProperty('detailedDescription')&&item.result.description==description){
                    item.result.detailedDescription.articleBody=index.extract
                    results.push(item.result);
                  }
                  callback3(null);
                },function(err)
                {
                  if(err)
                  {
                    console.log('Failed to process');
                  }
                  else {
                    callback2(null);
                  }
                });
              }
            });
          },function(err)
          {
            console.log("came");
            if(err)
            {
              console.log('Failed to process');
            }
            else {
              callback1(null);
            }
          });
        }
      });
    },function(err)
    {
      if( err )
      {
        console.log('Failed to process');
      }
      else
      {
        res.send(results);
      }
    });
  }
});
});
module.exports = router;
