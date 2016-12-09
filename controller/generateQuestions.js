var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var wdk = require('wikidata-sdk');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/generateQuestions', function(req, res, next) {
  var pIdForVariable=req.body.pIdForVariable;
  var qIDForVariable=req.body.qIDForVariable;
  var pIdForOption=req.body.pIdForOption;
  var numberOfQuestionsRequired=req.body.numberOfQuestions;
  var numberofOptions=req.body.numberofOptions;
  var sparql = `
  SELECT ?variable ?variableLabel ?optionLabel ?image
  WHERE { ?variable wdt:${pIdForVariable} wd:${qIDForVariable} .
         	?variable wdt:${pIdForOption} ?option .
          ?variable wdt:P18 ?image

        SERVICE wikibase:label {
  		bd:serviceParam wikibase:language "en" .
  	}

  }
  `
  var url = wdk.sparqlQuery(sparql);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
        res.send(body);
    }
  });
});
module.exports = router;
