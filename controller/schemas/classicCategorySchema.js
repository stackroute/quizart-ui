var mongoose = require('mongoose');

var classicCategorySchema = new mongoose.Schema({
  name: String,
  imageURL: String
}, {collection: 'classicCategories', versionKey: false});


const model = mongoose.model('classicCategories', classicCategorySchema);

module.exports = {
	docClassicCategoryModel: model
};
