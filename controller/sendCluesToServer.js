var async = require("async");
var express = require('express');
var router = express.Router();
var request = require('request');
var wdk = require('wikidata-sdk');
var neo4j = require('neo4j-driver').v1;
var nlp_compromise= require('nlp_compromise');
var driver = neo4j.driver(process.env.NEO4j_DRIVER, neo4j.auth.basic("neo4j", "password"));
var session = driver.session();

router.post('/sendCluesToServer', function(req, res, next) {
  console.log("in server");
  var pIdForVariable=req.body.pIdForSubject;
  var qIDForVariable=req.body.qIDForSubject;
  var description=req.body.selectedSubjectDescription;
  var topicSelected = req.body.topic;
  var sparql = `
  SELECT  ?variableLabel
  WHERE { ?variable wdt:${pIdForVariable} wd:${qIDForVariable} .
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en" .
  }
}LIMIT 50
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
    var startlimit=0,endlimit=10,end=10;
    var length=subjectList.length;
    console.log("length"+length);
    while(length>0)
    {
      var tempsubjectList=subjectList.slice(startlimit,endlimit);
      console.log(tempsubjectList);
      results=[];
      async.each(tempsubjectList, function(searchString, callback1){
        searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&indent=True';
        request(searchUri, function (error, response, body)
        {
          if(response!=undefined)
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
              console.log("came to second callback");
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
      }, function(err)
      {
        if( err )
        {
          console.log('Failed to process');
        }
        else
        {
          console.log("came to first callback"+results);
          async.each(results, function(data, callback){
            if(data.hasOwnProperty('detailedDescription'))
            {
              var ListItems='';
              var ListItemsCommaCondition='';
              let nlp = require('nlp_compromise');
              var clue = data.detailedDescription.articleBody;
              var name = data.name;
              var des = data.description;
              var nameArr = name.split(' ');
              var nameLength = nameArr.length;

              var isPosition = clue.search(/is /i);
              var wasPosition = clue.search(/was /i);
              var commaPosition = clue.search(/,/i);
              var dotPosition = clue.search(/./i);
              if (isPosition <= 80 || wasPosition <= 80) {
                var pattern = new RegExp(/.+?(( is))/, "i");
                var descriptionModification = clue.replace(pattern, "The subject is ");
                var descriptionModificationArray = descriptionModification.split(' ');
                for (var i = 0; i < nameArr.length; i++) {
                  descriptionModificationArray.map(function(element) {
                    if (element == nameArr[i]) {
                      var removeElement = new RegExp(nameArr[i], "ig");
                      descriptionModification = descriptionModification.replace(removeElement, "This");
                    }
                  });
                }
                var removeName = new RegExp(name, "ig");
                var descriptionModification = descriptionModification.replace(removeName, "________");
                var clueLength = nlp.text(descriptionModification).sentences.length;
                var clueArr = [];
                for (var i = 0; i < clueLength; i++) {
                  clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
                }
              } else if (commaPosition <= 80) {
                var pattern = new RegExp(/([^,]+)/, "i");
                var descriptionModification = clue.replace(pattern, "The " + des + " ");
                var descriptionModificationArray = descriptionModification.split(' ');
                for (var i = 0; i < nameArr.length; i++) {
                  descriptionModificationArray.map(function(element) {
                    if (element == nameArr[i]) {
                      var removeElement = new RegExp(nameArr[i], "ig");
                      descriptionModification = descriptionModification.replace(removeElement, "This");
                    }
                  });
                }
                var removeName = new RegExp(name, "ig");
                var descriptionModification = descriptionModification.replace(removeName, "________");
                var clueLength = nlp.text(descriptionModification).sentences.length;
                var clueArr = [];
                for (var i = 0; i < clueLength; i++) {
                  clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
                }
              } else {
                var pattern = new RegExp(/.+?(( is))/, "i");
                var descriptionModification = clue.replace(pattern, "The subject is ");
                var descriptionModificationArray = descriptionModification.split(' ');
                for (var i = 0; i < nameArr.length; i++) {
                  descriptionModificationArray.map(function(element) {
                    if (element == nameArr[i]) {
                      var removeElement = new RegExp(nameArr[i], "ig");
                      descriptionModification = descriptionModification.replace(removeElement, "This");
                    }
                  });
                }
                var removeName = new RegExp(name, "ig");
                var descriptionModification = descriptionModification.replace(removeName, "________");

                var clueLength = nlp.text(descriptionModification).sentences.length;
                var clueArr = [];
                for (var i = 0; i < clueLength; i++) {
                  clueArr[i] = nlp.text(descriptionModification).sentences[i].str;
                }
              }
            session
            .run("MERGE (p:Person {name:{name}})-[:Described_By]->(c:clue{clue:{clue}})-[:Belongs_To]->(t:Topic {topic:{topicChosen}}) return p",{name:data.name,clue:clueArr,topicChosen:topicSelected})

          }
        }, function(err)
          {
            if( err )
            {
              console.log('Failed to process');
            }
            else
            {
              console.log("Done");
            }
          });
        }
      });
      length=length-end;
      if(endlimit<=length)
      {
        startlimit=endlimit;
        endlimit=endlimit+end;
      }
    }
  }
});
});
module.exports = router;
