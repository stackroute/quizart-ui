var redis = require('redis');
var wdk = require('wikidata-sdk');
const client = require('../getRedisClient');
var pub = redis.createClient(6379, process.env.REDIS_HOST);
var pubDelete =  redis.createClient(6379, process.env.REDIS_HOST);
module.exports = function(socket) {
  socket.on('getData',function(data){
    var sub =  redis.createClient(6379, process.env.REDIS_HOST);

    console.log('Came in');
    var data=JSON.parse(data);
    console.log(data);
    var searchId=data.searchId;
    var startLimit=data.startLimit;
    var endLimit=data.endLimit;
    let count =startLimit;
    client.lrange(searchId,startLimit,endLimit,function(err,list){
      console.log('list',list);
      console.log('listlength',list.length);
      console.log('searchId',searchId);
         if(list.length==0)
        {
          console.log('list length is now zero');
        //sub.punsubscribe('*_publishList');
        sub.subscribe(searchId+'_publishList');
        sub.on('message',function(channel,clues)
        {
          console.log(clues);
          count++;
          if(count<endLimit)
          {
          socket.emit('finalClues',clues);
        }
        else if(count===endLimit)
        {
          socket.emit('finalClues',clues);
           sub.quit();
           //sub.unsubscribe(searchId+'_publishList');
        }
        else
        {
         sub.quit();
         //sub.unsubscribe(searchId+'_publishList');
        }
        });

      }
      else
      {
        console.log(' am in else not zero');
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
