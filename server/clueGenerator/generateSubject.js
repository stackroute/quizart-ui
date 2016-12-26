var express = require('express');
var router = express.Router();
var redis = require('redis');
var PandQString= redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME);

function generateSubject(io){
  console.log('came in');
  io.on('connection',function(socket){
    socket.on('sendPandQString',function(data){
      console.log(data);
      PandQString.publish('PandQString',data);
    })
  })
}
module.exports = generateSubject;
