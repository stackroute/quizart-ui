var async = require("async");
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var wdk = require('wikidata-sdk');
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));
var session = driver.session();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/sendCluesToServer', function(req, res, next) {
  var pIdForVariable=req.body.pIdForSubject;
  var qIDForVariable=req.body.qIDForSubject;
  var description=req.body.selectedSubjectDescription;
  var sparql = `
  SELECT  ?variableLabel
  WHERE { ?variable wdt:${pIdForVariable} wd:${qIDForVariable} .
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en" .
  }

}LIMIT 1
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
    async.each(subjectList, function(searchString, callback){
      searchUri='https://kgsearch.googleapis.com/v1/entities:search?query='+searchString+'&key=AIzaSyBIqOeykX5B6xGKC7xsZWmS86P81Zr12DY&indent=True';
      request(searchUri, function (error, response, body)
      {
        if (!error && response.statusCode == 200)
        {
          var cluesJson=JSON.parse(response.body);
          var itemList = cluesJson.itemListElement.forEach(function(item){
            if(item.result.description==description)
            {
              results.push(item.result);
            }
          });
          callback(null);
        }
      })
    }, function(err)
    {
      if( err )
      {
        console.log('Failed to process');
      }
      else
      {
        for(var data in results){

          var ListItems='';
          var ListItemsCommaCondition='';

          var clue=results[data].detailedDescription.articleBody;
          var name=results[data].name;
          var des=results[data].description;
          var nameArr=name.split(' ');
          var nameLength= nameArr.length;


          var isPosition= clue.search(/is /i);
          var wasPosition= clue.search(/was /i);
          var commaPosition= clue.search(/,/i);
          var dotPosition= clue.search(/./i);
          if(isPosition<=22 || wasPosition<=30){

            var pattern= new RegExp(/.+?(( is))/ ,"i");
            var descriptionModification= clue.replace(pattern , "This is ");

            var descriptionModificationArray= descriptionModification.split(' ');
            for(var i=0;i<nameArr.length;i++){
              descriptionModificationArray.map(function(element){
                if(element==nameArr[i]){
                  var removeElement= new RegExp(nameArr[i],"g");
                  descriptionModification = descriptionModification.replace(removeElement , "this");
                }
              });
            }
            var removeName= new RegExp(name,"g");
            var descriptionModification= descriptionModification.replace(removeName , "________");
            var clueArr=descriptionModification.split(/\.\s/);
            if(clueArr.length>1){clueArr.pop();}
            else{}
          }
          else if (commaPosition<=80  ) {

            var pattern= new RegExp(/([^,]+)/ ,"i");
            var descriptionModification= clue.replace(pattern , "The "+des +" ");

            var descriptionModificationArray= descriptionModification.split(' ');
            for(var i=0;i<nameArr.length;i++){
              descriptionModificationArray.map(function(element){
                if(element==nameArr[i]){
                  var removeElement= new RegExp(nameArr[i],"g");
                  descriptionModification = descriptionModification.replace(removeElement , "this");
                }
              });
            }
            var removeName= new RegExp(name,"g");
            var descriptionModification= descriptionModification.replace(removeName , "________");
            var clueArr=descriptionModification.split(/\.\s/);
            if(clueArr.length>1){clueArr.pop();}
            else{}
          }
          else {
            var descriptionModification= clue.replace(pattern , "This is ");
            var descriptionModificationArray= descriptionModification.split(' ');
            for(var i=0;i<nameArr.length;i++){
              descriptionModificationArray.map(function(element){
                if(element==nameArr[i]){
                  var removeElement= new RegExp(nameArr[i],"g");
                  descriptionModification = descriptionModification.replace(removeElement , "this");
                }
              });
            }
            var removeName= new RegExp(name,"g");
            var descriptionModification= descriptionModification.replace(removeName , "________");

            var clueArr=descriptionModification.split(/\.\s/);
            if(clueArr.length>1){clueArr.pop();}
            else{}
          }
          session
          .run("MERGE (p:Person {name:{name}})-[r:Described_By]->(clue:{clue}) return r",{name:results[data].name, clue:clueArr})

        }
      }
    });
  }
});
});
module.exports = router;
