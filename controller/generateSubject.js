var express = require('express');
var router = express.Router();
const getSimilarSubjects = require('./getSimilarSubjects');
const client = require('../getRedisClient');
const client1 = client.duplicate();

router.post('/generateSubject', function(req, res, next) {
  console.log("in question");
  let pID=req.body.pIdForSubject;
  let qID=req.body.qIDForSubject;
  let description=req.body.selectedSubjectDescription;
  let selectedSubject=req.body.selectedSubject;
  console.log('selected subject',selectedSubject);
  let searchId='cluesGenOutputQueue_'+Math.floor((Math.random() * 10000) + 1);
  console.log('Search ID', searchId);
  client1.rpush("cluesGenInputWorkQueue", JSON.stringify({"searchId": searchId, "subject": selectedSubject, "description": description}), (error, reply) => {
    console.log('RPushed In InputQueue'+selectedSubject);
  });

  getSimilarSubjects(pID, qID, description, (err, similarSubject) => {
    if(err) { console.log('ERR:',err); return }
    const data = {
      "searchId": searchId,
      "subject": similarSubject,
      "description": description,
    };

    client.lpush("cluesGenInputWorkQueue", JSON.stringify(data), (error, reply) => {
      // console.log('Pushed In InputQueue'+data.subject);
    });
  });
  res.send(searchId);
});
module.exports = router;
