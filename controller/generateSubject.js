var express = require('express');
var router = express.Router();
const getSimilarSubjects = require('./getSimilarSubjects');
const redis = require('redis');
const redisUrl = process.env.REDIS_HOSTNAME || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const client = redis.createClient(redisPort, redisUrl);

router.post('/generateSubject', function(req, res, next) {
  console.log("in question");
  var pId=req.body.pIdForSubject;
  var qID=req.body.qIDForSubject;
  var description=req.body.selectedSubjectDescription;
  var searchId='DATALIST'+Math.floor((Math.random() * 1000) + 1);
  getSimilarSubjects(pID, qID, description, (err, similarSubject) => {
    if(err) { console.log('ERR:',err); return }
    const data = {
      "searchId": searchId,
      "subject": similarSubject,
      "description": description,
    };
    client.lpush("cluesGenInputWorkQueue", JSON.stringify(data), (error, reply) => {
      console.log('Pushed');
    });
  });
  res.send(searchId);
});
module.exports = router;
