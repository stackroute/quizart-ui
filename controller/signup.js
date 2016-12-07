var express = require('express'),
router = express.Router();
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "Neo4j"));
var session = driver.session();

global.userData=[];

router.post('/signin',function(req,res){

  console.log("in signin js");
  console.log(req.body);


  session
    .run( "CREATE (a:Person {username:{name}, email:{email},password:{pass}, role:{role}}) return a",{name:req.body.userName, email:req.body.email, pass:req.body.password, role:"user"} )
    .then( function( result ) {
      // console.log("user is created");
      session.close();
      driver.close();
    })
  res.send("end");
});

module.exports = router;
