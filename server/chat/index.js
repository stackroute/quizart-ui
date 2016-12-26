var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOSTNAME);

//var initializeGame = require('../gameManager/initializeGame');



app.get('/',function(req,res)
	{
		res.sendFile(__dirname+"/index.html");
	});

io.on('connection', function(socket){

  client.get("gameId",function(err,reply)
  	{
  		console.log("GameID :"+reply);
  	});
  client.get("scores",function(err,reply)
  {
  	console.log("Scores :"+reply);
  });
  // socket.on('chat message', function(msg){
  //   //io.emit('chat message', msg);
  //   socket.broadcast.emit('chat message',msg);
  // });
})

http.listen(3050,function()
{
	console.log("File served");
})