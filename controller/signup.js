var express = require('express'),
router = express.Router();


global.userData=[];

console.log("helloKirti")

router.post('/signin',function(req,res){
  console.log("in signin js");
  console.log(req.body);
  res.send("end");
});

module.exports = router;
