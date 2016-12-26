var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var path = require('path');
<<<<<<< HEAD
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var Schema = mongoose.Schema;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});
=======
var config = require('./server/config');
var userRoute = require('./controller/index.js');
require('./server/db.js');
>>>>>>> 8cd05e5ad085ac793d8ae949a311b4ca7b2df125

var init  = require('./server/gameController/gameController');
init(io);

<<<<<<< HEAD
// var generateClue= require('./server/clueGenerator/generateSubject');
// generateClue(io);
=======
<<<<<<< HEAD
=======
var generateClue= require('./server/clueGenerator/generateSubject');
generateClue(io);

/*server.listen(8081, function() {
	console.log('yes its listening');
});
*/

>>>>>>> 8cd05e5ad085ac793d8ae949a311b4ca7b2df125

>>>>>>> 7a323d88195e6b0e9ff3713937ccbac7ccad01d1
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

app.use(require('cookie-parser')());
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/login',userRoute);
app.use('/',userRoute);
app.use('/signin',userRoute);
server.listen(process.env.EXPRESS_PORT,function(){
  console.log('Application is listening on port 8081');
});
