var mongoose = require('mongoose');

var announcementSchema = new mongoose.Schema({
  index : Number,
  picture : String,
  name : String,
  about : String
}, {collection: 'announcements', versionKey: false});


const model = mongoose.model('announcements', announcementSchema);

module.exports = {
	docAnnouncementModel: model
};
