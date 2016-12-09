var express = require('express'),
router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));
var session = driver.session();

global.userData=[];

router.post('/storeJeopardyClues',function(req,res){

  console.log("in storeClue js");
  console.log(req.body);


  session
    .run( "CREATE (n:Topic {name:{name}, description:{description},clueArr:{clueArr}}) return n",{name:req.body.name, description:req.body.description, clueArr:req.body.clueArr} )
    .then( function( result ) {
      // console.log("user is created");
      session.close();
      driver.close();
    })
  res.send("end");
});

module.exports = router;
