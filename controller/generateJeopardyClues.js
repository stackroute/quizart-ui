var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/generateJeopardyClues', function(req, res, next) {
  var generatedSubjects=[];
  generatedSubjects=req.body.generatedSubjects;
  var searchUri;
  console.log(generatedSubjects);
  generatedSubjects.map(function(searchString){
        searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&limit=5&indent=True';
        request(searchUri, function (error, response, body) {
        console.log(body);
        if (!error && response.statusCode == 200) {
              res.send(body);
          }
  })
});
});
module.exports = router;
