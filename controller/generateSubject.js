var async = require("async");
var express = require('express');
var router = express.Router();
var request = require('request');
var wdk = require('wikidata-sdk');
<<<<<<< HEAD
var config = require('../server/config');
var redis = require('redis');
var client = redis.createClient(config.REDIS_PORT, config.REDIS_HOSTNAME);
=======
var redis = require('redis');
const redisUrl= process.env.REDIS_URL;
let client = redis.createClient(redisUrl);
let client1 = redis.createClient(redisUrl);
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// emitter.setMaxListeners(100);
>>>>>>> 7a323d88195e6b0e9ff3713937ccbac7ccad01d1

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
}LIMIT 2
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
                    // results.push(item.result);
                    var result=JSON.stringify(item.result);
<<<<<<< HEAD
                    client.lrange('SPORTS',result, function(error , list) {
=======
                    client.lpush('SPORTS',result, function(error , list) {
                      count++;
>>>>>>> 7a323d88195e6b0e9ff3713937ccbac7ccad01d1
                      console.log('remaining elements in the list is :',list);
                    });
                    if(count<=10)
                    {
                      client.publish('clues',result);
                      client1.subscribe('clues');
                      client1.on('message', function(channel, msg) {

                            socket.emit('sendClues',{
                              clues: msg
                            });

                      });
                    }
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
          client.quit();
          //res.send(results);
        }
      });
    }
  });
});
module.exports = router;
