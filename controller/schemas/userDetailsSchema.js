var mongoose = require('mongoose');

var userDetailsSchema = new mongoose.Schema({
  userName : String,
  avatarImage : String,
  flags : String,
  rank : Number
}, {collection: 'userDetails', versionKey: false});


const model = mongoose.model('userDetails', userDetailsSchema);

module.exports = {
	docUserDetailsModel: model
};
