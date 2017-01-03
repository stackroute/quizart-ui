var express = require('express'),
router = express.Router();
var neo4j = require('neo4j-driver').v1;
const neo4jDriver = process.env.NEO4j_DRIVER || 'bolt://localhost';
var driver = neo4j.driver(neo4jDriver, neo4j.auth.basic("neo4j", "password"));
var session = driver.session();
global.userData=[];
router.post('/signin',function(req,res){

  console.log("in signin js");
  console.log(req.body);


  session
  .run( "CREATE (a:Person {username:{name}, email:{email},password:{pass}, role:{role}}) return a",{name:req.body.userName, email:req.body.email, pass:req.body.password, role:"user"} )
  .then( function( result ) {
    console.log(result);
    console.log("user signed in");
    // session.close();
    // driver.close();
  })
  res.send("end");
  console.log("after session ends");
});

module.exports = router;
