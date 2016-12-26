var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/identifyingSubject', function(req, res, next) {
  var searchString=req.body.searchValue;
  var searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&indent=True';
  request(searchUri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body);
    }
  });
});
module.exports = router;
