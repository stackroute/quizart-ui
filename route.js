var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var path = require('path');
var config = require('./server/config');
var userRoute = require('./controller/index.js');
var init  = require('./socket');
init(io);

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
app.use('/',userRoute);
app.use('/signin',userRoute);
server.listen(process.env.EXPRESS_PORT,function(){
  console.log('Application is listening on port 8081');
});
