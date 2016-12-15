var router = require('express').Router();
router.post('/newChallenge/',function(req,res){
   var j=req.body.newChallenge;
   console.log("req"+req);
   console.log(j);
    res.send(j);

});
module.exports = router