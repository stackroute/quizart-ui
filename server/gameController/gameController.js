var redis = require('redis');
const redisUrl= process.env.REDIS_URL;
var client = redis.createClient(redisUrl);

var score='';
var user='';
function init(io)
{
    io.on('connection',function(socket){
        console.log("YES! server connection established");

        socket.on('testMsg',function(data)
        {
            console.log('test1');
            console.log(data);
            client.get("users",function(err,reply)
            {
                console.log('test2');
                var data=[];
                user=JSON.parse(reply);
                client.get("scores",function(err,reply){
                    score=JSON.parse(reply);
                    data.push(user);
                    data.push(score);
                    console.log(data);
                    socket.emit("data",data);
                });
            });
        });

        socket.on('jGamePlay',function(msg)
        {
            console.log("user chose "+msg);
            client.get("gameId",function(err,reply)
            {
                var questions = [];

                var gameId = reply;
                console.log(gameId);
                var quesNum=Math.floor((Math.random() * (29 - 0 + 1)) + 0);
                console.log(quesNum);
                client.get(gameId+"_questions",function(err,reply)
                {
                    questions = JSON.parse(reply);
                    console.log("question Array: ", questions[quesNum]);
                    socket.emit("question",questions[quesNum]);
                });
            })
        });
    });
}

module.exports = init;
