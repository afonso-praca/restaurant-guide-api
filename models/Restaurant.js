var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var _ = require("underscore");

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
	address: {
		type: String,
		required: false,
		trim: true
	},
	phone: {
		type: String,
		required: false,
		trim: true
	},
	comments: [
		{
			body: {
				type: String,
				required: true,
				trim: true
			},
			title: {
				type: String,
				required: true,
				trim: true
			},
			stars: String,
			user_id: {
				type: String,
				required: true,
				trim: true
			},
			user_name: {
				type: String,
				required: true,
				trim: true
			},
			user_image: {
				type: String,
				required: true,
				trim: true
			},
			date: Date
		}
	]
});

// assign a function to the "methods" object of our animalSchema
RestaurantSchema.methods.findSimilarExpertises = function (cb) {
	return this.model('Restaurant').find({ expertise: this.expertise }, cb);
};

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);