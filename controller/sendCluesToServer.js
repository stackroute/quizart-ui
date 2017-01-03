var async = require("async");
var express = require('express');
var router = express.Router();
var request = require('request');
var wdk = require('wikidata-sdk');
var neo4j = require('neo4j-driver').v1;
var nlp_compromise= require('nlp_compromise');
const neo4jDriver = process.env.NEO4j_DRIVER || 'bolt://localhost'
var driver = neo4j.driver(neo4jDriver, neo4j.auth.basic("neo4j", "password"));
var session = driver.session();
const client = require('../getRedisClient');
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/sendCluesToServer', function(req, res, next) {
 console.log("in server");
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
         var difficulty=200,clueArray=[],start=0,end=0;
         var clueArrayLength=clueArr.length;
         var lengthOfInterval=clueArrayLength/5;
         end=lengthOfInterval;
         for(var i=0;i<lengthOfInterval;i++)
         {
                clueArray=clueArr.slice(start,end);
                console.log(clueArray);
                let query="CREATE (t:topic {topics:{topicChosen}})<-[:Belongs_to]-(s:subject {subject:{subject}}) FOREACH (clueArray in {clue} |  MERGE (s)-[:Described_by]->(c:clue{clue:clueArray,difficulty:difficulty})) return t"
                let params={subject:subjectData.name,clue:clueArray,topicChosen:topicSelected,difficulty:difficulty};
                session
                   .run(query,params)
                   .then(function(results){
                      session.close;
                      driver.close;
                    })
                difficulty*=2;
                start=end;
                end=lengthOfInterval*2;
         }

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
