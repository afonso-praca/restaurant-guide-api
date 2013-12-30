var mongoose = require("mongoose");
var Restaurant = mongoose.model("Restaurant");

//
// GET LIST OF RESTAURANTS
//
exports.getAllRestaurants = function(req, res){
	return Restaurant.find(function (err, restaurants) {
		if (!err) {
			return res.jsonp(restaurants);
		} else {
			return console.log(err);
		}
	});
};

//
// CREATES A RESTAURANT
//
exports.newRestaurant = function (req, res) {
	var restaurant = new Restaurant(req.body);
	restaurant.save(function (err) {
		if (!err) {
			console.log("created");
			return res.jsonp(restaurant);
		} else {
			console.log(err);
			return res.send("error");
		}
	});
};