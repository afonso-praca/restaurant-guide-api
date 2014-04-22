var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	user_image: String,
	facebook_id: String,
	facebook: { },
	createdAt: { type: Date, 'default': Date.now },
	provider: String
});

module.exports = mongoose.model('User', UserSchema);