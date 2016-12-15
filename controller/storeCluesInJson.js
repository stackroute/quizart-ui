var express = require('express'),
router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));
var session = driver.session();
var async = require("async");
var clues=[];
router.post('/storeCluesInJson',function(req,res){
  console.log("in storing");
  var topics=["Sports","Music","Technology","History","Politics","Movies"];
  async.each(topics, function(topic, callback){
    session
    .run( "MATCH(p:Person)-[r:Described_By]->(c:clue)-[:Belongs_To]->(t:Topic {topic:{topicSelected}}) return p,c order by rand() limit 5",{topicSelected:topic} )
    .then(function(results)
    {
      results.records.map(function(obj){
        obj.forEach(function(value){
          clues.push(value.properties);
        })
      })
    });
  },function(err){
    if(err)
    {
      console.log("Error");
    }
    else{
      console.log("call backcame");
      console.log(clues);
      session.close();
      driver.close();
    }
  });
});
module.exports = router;
