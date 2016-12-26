var express = require('express'),
router = express.Router();
var jwt = require('jsonwebtoken');
var authenticateToken = "";
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver(process.env.NEO4j_DRIVER, neo4j.auth.basic("neo4j", "password"));


global.users=[
  {
    "id":"adm01",
    "name":"Sagar Patke",
    "userName":"sagarpatke@gmail.com",
    "password":"password",
    "role":"admin"
  },
  {
    "id":"adm02",
    "name":"Neelanjan Sen",
    "userName":"neelanjansen@gmail.com",
    "password":"password",
    "role":"admin"
  },
  {
    "id":"adm03",
    "name": "Vishant Sharma",
    "userName":"vishantsharma@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"adm04",
    "name": "Kirti Jalan",
    "userName":"kirtijalan@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"adm05",
    "name": "Nitin Verma",
    "userName":"nitinverma@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"adm06",
    "name": "Dhivyalakshmi",
    "userName":"dhivyalakshmi@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"adm07",
    "name": "Lal Jose",
    "userName":"laljose@gmail.com",
    "password":"password",
    "role":"admin"
  },{
    "id":"adm08",
    "name": "Srinivasan",
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
            authenticateToken=jwt.sign({sub:users[i].id, name:users[i].name, role:'admin'}, "Quizztack")
          }
        }
      }
    }
    else {
      isValid = true;
      var nameOfUser =  results.records[0]._fields[0].properties.username;
      // console.log("user's name is ", nameOfUser)
      // console.log("Results here: ",);
      // console.log("Results here: ",JSON.stringify(results.records._fields[0]));
      authenticateToken=jwt.sign({sub:username, name: nameOfUser, role:'user'}, "Quizztack")
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
    // session.close();
    // driver.close();
  })
});

module.exports = router;
