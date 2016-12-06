var express = require('express'),
router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var authenticateToken = "";
router.use(bodyParser.json());

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
    "role":"user"
  },{
    "id":"usr2",
    "userName":"kirtijalan@gmail.com",
    "password":"password",
    "role":"user"
  },{
    "id":"usr3",
    "userName":"nitinverma@gmail.com",
    "password":"password",
    "role":"user"
  },{
    "id":"usr4",
    "userName":"dhivyalakshmi@gmail.com",
    "password":"password",
    "role":"user"
  },{
    "id":"usr5",
    "userName":"laljose@gmail.com",
    "password":"password",
    "role":"user"
  },{
    "id":"usr6",
    "userName":"srinivasan@gmail.com",
    "password":"password",
    "role":"user"
  }
];

router.post('/login',function(req,res){
  //check if users exists
  var username = req.body.userName;
  var pwd = req.body.password;
  // console.log("username is " , username);
  for(var i=0;i<global.users.length;i++){
    if(username==users[i].userName){
      if(pwd==users[i].password){
        authenticateToken=jwt.sign({sub:users[i].id, role:users[i].role}, "QuizztackAdmin")
        res.status(200).json({
          message: authenticateToken,
          error: false
        });
      }
      else{
        console.log("incorrect pwd . forgot password?");
        res.status(401).json({
          message: "User Email or Password is Incorrect",
          error: true
        });

      }
    }else {
      console.log('invalid');
  }
}
});

module.exports = router;
