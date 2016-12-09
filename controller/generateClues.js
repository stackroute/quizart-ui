var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/generateClues', function(req, res, next) {
  var searchString=req.body.searchValue;
  var searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&limit=5&indent=True';
  request(searchUri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body);
    }
  });
});
module.exports = router;
