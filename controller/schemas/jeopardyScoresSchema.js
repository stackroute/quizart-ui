var mongoose = require('mongoose');

var jeopardyScoresSchema = new mongoose.Schema({
playerId : String,
totalScore : Number,
noOfCorrectAns : Number,
noOfAttemptedQues : Number,
avgTimeCorrectAns : Number,
accuracy : Number,
confidence : Number,
picture : String
}, {collection: 'jeopardyScores', versionKey: false});

const model = mongoose.model('jeopardyScores', jeopardyScoresSchema);

module.exports = {
	docJeopardyScoresModel: model
};
