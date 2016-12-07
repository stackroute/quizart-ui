var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/getOptionMeaning', function(req, res, next) {
  var searchString=req.body.selectedOption;
  var searchUri='https://www.wikidata.org/w/api.php?action=wbsearchentities&search='+searchString+'&type=property&language=en&format=json';
  request(searchUri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body);
    }
  });
});
module.exports = router;
