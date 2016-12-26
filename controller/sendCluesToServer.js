var async = require("async");
var express = require('express');
var router = express.Router();
var request = require('request');
var wdk = require('wikidata-sdk');
var neo4j = require('neo4j-driver').v1;
var nlp_compromise= require('nlp_compromise');
var driver = neo4j.driver(process.env.NEO4j_DRIVER, neo4j.auth.basic("neo4j", "password"));
var session = driver.session();

const redis = require('redis');
const redisUrl= process.env.REDIS_URL;
let client = redis.createClient(redisUrl);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
}LIMIT 10
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

  let nlp = require('nlp_compromise');
  // var lengthofList=client.LLEN('SPORTS');
  // console.log(lengthofList);
  // var startLimit=0,endLimit=2,end=2,count=0;
  // while(lengthofList>0)
  // {
  //   count++;
  //   console.log(count);
  client.LRANGE('SPORTS', 0,100, function(error, data) {
    data.map(function(value){
      var subjectData=JSON.parse(value);
      var clue=subjectData.detailedDescription.articleBody;
      var flag=0;
      var sentences=[],clueArr=[];
      var jeopardyClues=[];
      var des = subjectData.description;
      var name = subjectData.name;
      var nameArr = name.split(' ');
      var nameLength = nameArr.length;
      var splitByDot=nlp.text(clue);
      splitByDot.sentences.map(function(value){
        var pattern = new RegExp(/((, ))/, "ig");
        var values=value.str.split(pattern);
        values.forEach(function(eachSentence){
          var element = nlp.text(eachSentence).text();
          var temp=element.trim().split(' ').length;
          if(temp>4)

          {
            var checkGrammer=nlp.text(element);
            checkGrammer.sentences.forEach(function(terms){
              if(terms.terms[0].tag=="Noun"||terms.terms[0].tag=="Adverb"||terms.terms[0].tag=="Person")
              {
                sentences.push(terms.str);
              }
              else if(terms.terms[0].normal=="and")
              {
                terms.terms.forEach(function(value){
                  if((value.pos.hasOwnProperty("Verb")||value.pos.hasOwnProperty("Adjective"))&&flag==0)
                  {
                    sentences.push(terms.str);
                    flag=1;
                  }
                })
                flag=0;
              }
            })
          }
        })
      })
      if(sentences.length>5)
      {
        var isPosition = sentences[0].search(/ is /i);
        var wasPosition = sentences[0].search(/ was /i);
        var pattern = new RegExp(/.+?(( is))/, "i");
        if(isPosition==-1){
          sentences.splice(0,2);
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
          

          sentences[0]=sentences[0].replace(pattern, "The subject is ");
        }
        for(var j=0;j<sentences.length;j++)
        {
          for (var i = 0; i < nameArr.length; i++) {
            var removeElement = new RegExp(nameArr[i], "ig");
            sentences[j]=sentences[j].replace(removeElement,"Our Subject");

          }
        }
        if(sentences.length>5)
        {
          clueArr=sentences;
          console.log(clueArr);
          let query="CREATE (t:topic {topics:{topicChosen}})<-[:Belongs_to]-(s:subject {subject:{subject}}) FOREACH (clueArr in {clue} |  MERGE (s)-[:Described_by]->(c:clue{clue:clueArr})) return t"
          let params={subject:subjectData.name,clue:clueArr,topicChosen:topicSelected};
          session
          .run(query,params)
          .then(function(results){
            session.close;
            driver.close;
          })
        }
      }
    });
  })
  //   lengthofList=lengthofList-end;
  //   if(endLimit<=lengthofList)
  //   {
  //     startLimit=endLimit;
  //     endLimit=endLimit+end;
  //   }
  // }
  client.del('SPORTS');
});

module.exports = router;
