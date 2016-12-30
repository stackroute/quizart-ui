const mongoose = require('mongoose');
const config = require('./config.js');
const mongoURL = config.MONGO_URL
mongoose.Promise = require('bluebird');

mongoose.connect(mongoURL, function(err) {
console.log(mongoURL);

  if(err) { console.error('Couldnt connect to mongodb:',err); process.exit(-1); }
  console.log('Connected to MongoDB');
});
