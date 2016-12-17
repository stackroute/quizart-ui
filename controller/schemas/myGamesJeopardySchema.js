var mongoose = require('mongoose');

var myGamesJeopardySchema = new mongoose.Schema({
  category : String,
  score : Number,
  position : Number,
  noOfGamesPlayed : Number,
  playedDate : String
}, {collection: 'myGamesJeopardy', versionKey: false});


const model = mongoose.model('myGamesJeopardy', myGamesJeopardySchema);

module.exports = {
	docMyGamesJeopardyModel: model
};
