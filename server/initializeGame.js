var redis = require('redis');
var client = redis.createClient();

function initializeGame(gameId,questions,users,playerScores)
{	
	client.set(gameId+"_questions",JSON.stringify(questions),function(err,reply)
	{
		console.log(reply);
	});

	client.set("gameId",gameId,function(err,reply)
	{
		console.log(reply);
	});

	client.set("users",JSON.stringify(users),function(err,reply)
	{
		console.log(reply);
	});

	client.set("scores",JSON.stringify(playerScores),function(err,reply)
	{
		console.log(reply);
	});
}
module.exports = initializeGame;

