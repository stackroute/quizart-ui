const mongoose = require('mongoose');
const config = require('./config.js');
const mongoURL = config.MONGO_URL
mongoose.Promise = require('bluebird');

mongoose.connect(mongoURL, function(err) {
console.log(mongoURL);

  if(err) { console.err('Couldn\'t connect to mongodb'); process.exit(-1); }
  console.log('Connected to MongoDB');
});