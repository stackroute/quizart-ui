var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

server.listen(8084, function() {
	console.log('server listening on port 8084');
});

io.on('connection', function(socket) {
	console.log('server connected to socket');
	socket.emit('news', {hello: 'world'});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});


app.use(bodyParser.json());
// app.use(express.static(__disrname + '/client'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users/login',require('./controller/index.js'));
app.use('/',require('./controller/index.js'));
app.use('/signin',require('./controller/index.js'));
