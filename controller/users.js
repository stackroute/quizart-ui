var express = require('express'),
router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var authenticateToken = "";
router.use(bodyParser.json());
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "password"));


global.users=[
  {
    "id":"adm01",
    "userName":"sagarpatke@gmail.com",
    "password":"password",
    "role":"admin"
  },
  {
    "id":"adm02",
    "userName":"neelanjansen@gmail.com",
    "password":"password",
    "role":"admin"
  },
  {
    "id":"usr1",
    "userName":"vishantsharma@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"usr2",
    "userName":"kirtijalan@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"usr3",
    "userName":"nitinverma@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"usr4",
    "userName":"dhivyalakshmi@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"usr5",
    "userName":"laljose@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"usr6",
    "userName":"srinivasan@gmail.com",
    "password":"password",
    "role":"admin"
  }
];

router.post('/login',function(req,res){
  //check if users exists
  var username = req.body.userName;
  var pwd = req.body.password;
  var session = driver.session();
  
  var isValid = false;

  session.run("MATCH (n:Person {email:{email},password:{pass}}) return (n)",{email:username,pass:pwd})
  .then(function(results){
    if(results.records.length===0)
    {
      isValid = false;
      for(var i=0;i<global.users.length;i++){
        if(username==users[i].userName){
          if(pwd==users[i].password){
            isValid=true;
            authenticateToken=jwt.sign({sub:users[i].id, role:'admin'}, "QuizztackAdmin")
          }
        }
      }
    }
    else {
      isValid = true;
      authenticateToken=jwt.sign({sub:username, role:'user'}, "QuizztackAdmin")
    }

    res.status(200).json({
      message: authenticateToken,
      error: false,
      isValid: isValid
    });
    session.close();
    driver.close();
  })
  .catch(function(error){
    console.log(error);
    res.status(401).json({
      message: "username/password incorrect",
      error: true
    });
    session.close();
    driver.close();
  })
});

module.exports = router;
