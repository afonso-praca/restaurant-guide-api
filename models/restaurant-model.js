var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	expertise: {
		type: String,
		required: false,
		trim: true
	},
	neighborhood: {
		type: String,
		required: false,
		trim: true
	},
	image: {
		type: String,
		required: false,
		trim: true
	},
	modified: {
		type: Date,
		default: Date.now
	}
});

mongoose.model("Restaurant", RestaurantSchema);