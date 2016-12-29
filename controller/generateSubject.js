var redis = require('redis');
var express = require('express');
var router = express.Router();
var request = require('request');
var wdk = require('wikidata-sdk');
const redisUrl = process.env.REDIS_URL || "localhost";
const redisPort = process.env.REDIS_PORT || "6379";
var workqueue = redis.createClient(redisPort, process.env.REDIS_HOSTNAME);

router.post('/generateSubject', function(req, res, next) {
  console.log("in question");
  var pIdForVariable=req.body.pIdForSubject;
  var qIDForVariable=req.body.qIDForSubject;
  var description=req.body.selectedSubjectDescription;
  var searchId;
  var sparql = `
  SELECT  ?variableLabel
  WHERE { ?variable wdt:${pIdForVariable} wd:${qIDForVariable} .
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en" .
  }
}
`
var subjectList=[];
var url = wdk.sparqlQuery(sparql);
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    searchId='DATALIST'+Math.floor((Math.random() * 1000) + 1);
    var subjectsJson=JSON.parse(response.body)
    subjectsJson.results.bindings.map(function(item){
      workqueue.lpush('workQueue',JSON.stringify({workQueueData:item.variableLabel.value,selectedSubjectDescription:description,
        searchId:searchId}));
      });
      res.send(searchId);
    }
  })
});
module.exports = router;
