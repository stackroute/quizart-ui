var redis = require('redis');
var wdk = require('wikidata-sdk');
const client = require('../getRedisClient');
var pub = redis.createClient(6379, process.env.REDIS_HOST);
var pubDelete =  redis.createClient(6379, process.env.REDIS_HOST);
var sub =  redis.createClient(6379, process.env.REDIS_HOST);
module.exports = function(socket) {
  socket.on('getData',function(data){
    var data=JSON.parse(data);
    var searchId=data.searchId;
    var startLimit=data.startLimit;
    var endLimit=data.endLimit;
    let count =startLimit;
    client.lrange(searchId,startLimit,endLimit,function(err,list){
         if(list.length==0)
        {
        sub.subscribe('publishList');
        sub.on('message',function(channel,clues){
          count++;
          if(count<endLimit){
          socket.emit('finalClues',clues);
        }
        else if(count==endLimit){
          socket.emit('finalClues',clues);
           sub.quit();
        }
        else{
         sub.quit();
        }
        });
      }
      else
      {
        console.log(' am in else');
        socket.emit('finalClues',list);
      }
      });
  });
  socket.on('sendSearchId',function(data){
    pub.publish('publishSearchId',data);
  });

  socket.on('sendSearchIdToDelete',function(data){
    pubDelete.publish('publishSearchIdToDelete',data);
  });
}
