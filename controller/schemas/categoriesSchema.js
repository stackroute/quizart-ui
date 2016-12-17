var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  imageUrl: String,
  noOfGamesPlayed: Number,
  name: String
}, {collection: 'categories', versionKey: false});


const model = mongoose.model('categories', categorySchema);

module.exports = {
	docCategoryModel: model
};
