var express = require('express'),
router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));
var session = driver.session();
var async = require("async");
var clues=[];
router.post('/storeCluesInJson',function(req,res){
  console.log("in storing");
  var topics=["Sports","Music","Science","History","Politics","Movies"];
  var options=[];
  async.each(topics, function(topic, callback){
    session
    .run( "MATCH(p:Person)-[r:Described_By]->(c:clue)-[:Belongs_To]->(t:Topic {topic:{topicSelected}}) return p,c order by rand() limit 5",{topicSelected:topic} )
    .then(function(results)
    {
      results.records.map(function(obj){
        var tempArr=[];
        obj.forEach(function(value){
          tempArr.push(value.properties);
        })
          clues.push(tempArr);
      })
      // session.close();
    })
    callback(null)
  },function(err){
    if(err)
    {
      console.log("Error");
    }
    else{
      console.log(clues);
    }
  });


  async.each(topics, function(topic, callback){
    session
    .run( "MATCH(p:Person)-[r:Described_By]->(c:clue)-[:Belongs_To]->(t:Topic {topic:{topicSelected}}) return p order by rand() limit 30",{topicSelected:topic} )
    .then(function(results)
    {
      var tempArr=[];
      results.records.map(function(obj){
        obj.forEach(function(value){
        tempArr.push(value.properties.name);
        })
      })
      options[topic]=tempArr;
      tempArr=[];
      // session.close();
      //console.log(options);
    })
    callback(null)
  },function(err){
    if(err)
    {
      console.log("Error");
    }
    else{
      console.log(options);
    }
  });
});
module.exports = router;
