var express = require('express');
var router = express.Router();
var request = require('request');
var redis = require('redis');
var client = redis.createClient();
var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var gameId='';
var playerNames = '';
var data = [];
io.on('connection',function(socket)
{
	console.log("serverconnected");
	socket.on('data',function()
	{
		socket.send('testMsg',"msg sent from server");
	});
});


//  function call(socket) {
// 	console.log('hey');

// 	socket.on('data', function(data) {
// 		console.log('done');
// 			console.log(data);
// 	})
// };





// io.on('connection',function()
// {
// 	 console.log("connected");
// 	// client.get("scores",function(err,reply)
// 	// 	{
// 	// 		gameId=reply;
// 	// 	});
// 	// client.get("users",function(err,reply)
// 	// 	{
// 	// 		playerNames=reply;
// 	// 		data.push(gameId);
// 	// 		data.push(playerNames);
// 	// 	});
// 	// client.on('disconnect',function()
// 	// {
// 	// 	console.log('disconnected');
// 	// })
// });


// router.post('/initialGameData',function(req, res, next)
// {
// 	console.log('inside inditialGameData');
// 	//res.send(data);

// });


http.listen(3050,function()
{
	console.log("http listening");
});

module.exports = router;
