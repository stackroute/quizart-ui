var express = require('express');
var app = express();
var userRoute = require('./controller/index.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
//   // we're connected!
// //   db.categories.find({}, function(err, categories) {
// //   if (err) throw err;
// //
// //   // object of all the users
// //   console.log(categories);
// // });
//   console.log("connected");
});


var init  = require('./server/gameController/gameController');

init(io);


/*server.listen(8081, function() {
	console.log('yes its listening');
});
*/


if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.config.js')
  const compiler = webpack(config)

  app.use(logger('dev'));
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

io.on('connection', function(socket) {
	console.log('server connected to socket');
	socket.emit('news', {hello: 'world'});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/users/login',userRoute);
app.use('/',userRoute);
app.use('/signin',userRoute);
server.listen('8081',function(){
  console.log('Application is listening on port 8081');
});
