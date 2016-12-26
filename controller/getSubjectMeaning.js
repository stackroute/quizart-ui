var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/getSubjectMeaning', function(req, res, next) {
  var searchString=req.body.selectedVariable;
  var searchUri='https://www.wikidata.org/w/api.php?action=wbsearchentities&search='+searchString+'&language=en&format=json';
  request(searchUri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body);
    }
    console.log(error);
  });
});
module.exports = router;
