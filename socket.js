var redis = require('redis');
const redisUrl= process.env.REDIS_URL;
var pubClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME);
var subClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME);
var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME);
var jwt = require('jsonwebtoken');
var score='';
var user=[];
let count = '';
let tempEmail= [];
function init(io)
{
    io.on('connection',function(socket){
        // **************  PROVISIONER ***********************
        console.log("Server connection established");
        socket.on('queue',function(data){
          console.log('queued here:', data.token);
          var jwtTokenAuth = jwt.verify(data.token, "Quizztack");
          var gameId = "abc123";
          jwt.verify(data.token, "Quizztack",function(err,token){
            if(err){
              console.log(err);
              socket.emit('joinRequest',{
                gameID: null
              });
            }else{
              console.log("authenticated Token: ",jwtTokenAuth.name);
              socket.emit('joinRequest',{
                userTokenName: jwtTokenAuth.name,
                gameID: gameId
              });
            }
          });
        });

        // socket.on('joiningNow',function(data){
        //   console.log("Ready to play ", data.gameID);
        // });

        socket.on('queue',function(data){
         console.log('queued here:', data.token);
         var jwtTokenAuth = jwt.verify(data.token, "Quizztack");
         jwt.verify(data.token, "Quizztack",function(err,token){
           if(err){
             console.log(err);
           }else{
             console.log("authenticated Token: ",jwtTokenAuth.name);
             // socket.emit('userID', jwtTokenAuth.name);
           }
         });
       });


        socket.on('testMsg',function(data)
        {
            console.log('test1');
            console.log(data);
            socket.on('joining', function(userData) {
                console.log('userData', userData);
                if(!tempEmail.includes(userData.userId)) {
                  if(user.length<4){
                  user.push(userData.userName);
                  redisClient.lpush('queuedPlayer',userData.userName);
                  redisClient.LLEN('queuedPlayer',function(error,length){
                      console.log('Length of Player Queue  :', length);
                  });

                  tempEmail.push(userData.userId);
                }
                };
                socket.emit("data",user);
                console.log("user Length:",user.length);
                if(user.length<4)
                  pubClient.publish('joined',userData.userId);
                else {
                  console.log("3 users ready to play");
                }
             });
             if(user.length<4){
               subClient.subscribe('joined');
               subClient.on('message', function(channel, msg) {
                   console.log(user);
                   socket.emit("data",user);
                       console.log(channel);
             });
           }
             else{
               console.log("3 users already subscribed");
             }

        socket.on('disconnect',function(){
          console.log("Disconnected on Refresh");
          redisClient.DEL('playerQueue');
          var playersQueued = [];
          console.log(user.length);
          for(var j=0;j<3;j++){
            playersQueued.push(user[j]);
          }
          console.log(playersQueued);
          user=[];
          user = playersQueued;
        });
        });
        socket.on('jGamePlay',function(msg)
        {
            console.log("user chose "+msg);
            pubClient.get("gameId",function(err,reply)
            {
                var questions = [];
                var gameId = reply;
                console.log(gameId);
                socket.emit('gameId', gameId);
                var quesNum=Math.floor((Math.random() * (29 - 0 + 1)) + 0);
                console.log(quesNum);
                pubClient.get(gameId+"_questions",function(err,reply)
                {
                console.log(reply);
                    questions = JSON.parse(reply);
                    console.log("question Array: ", questions[quesNum]);
                    socket.emit("question",questions[quesNum]);
                });
            });
        });

          // **************  CONTROLLER ***********************

		// socket.on('openCard', function(index)
          // {
          //   console.log("Getting index");

          //   socket.emit('forceOpen', index);
            socket.on('cardFlip', function(data){

              console.log("Card Flip Data on ServerSide"+data.msg);

              socket.broadcast.emit('cDataUsers', data.msg);

            });




          // });



            // **************  CLUE GENERATOR ***********************






    });
}

module.exports = init;
