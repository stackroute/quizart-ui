var mongoose = require('mongoose');

var myChallengeSchema = new mongoose.Schema({
  nameOfTheChallenge : String,
  topic : String,
  totalNoOfQuestions : Number,
  durationInMins : Number,
  durationInSecs : Number,
  scoreForRight : Number,
  scoreForWrong : Number,
  imageUrl : String
}, {collection: 'myChallenges', versionKey: false});


const model = mongoose.model('myChallenges', myChallengeSchema);

module.exports = {
	docMyChallengeDashModel: model
};
