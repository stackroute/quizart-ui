var mongoose = require('mongoose');

var ChallengeGameplaySchema = new mongoose.Schema({
  question: String,
  options: [String],
  imageURLs: String,
  correctOption: String
}, {collection: 'challengeGameplay', versionKey: false});

const model = mongoose.model('challengeGameplay', ChallengeGameplaySchema);

module.exports = {
	docChallengeGameplayModel: model
};
