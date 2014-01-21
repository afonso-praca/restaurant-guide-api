var mongoose = require("mongoose");
var Restaurant = mongoose.model("Restaurant");

//
// GET LIST OF RESTAURANTS
//
exports.getAllRestaurants = function(req, res){
	return Restaurant.find(function (err, restaurants){
		if (!err) {
			res.header('Access-Control-Allow-Origin', "*");
			return res.jsonp(restaurants);
		} else {
			return console.log(err);
		}
	});
};

//
// GET A SPECIFIC RESTAURANT BY ID
//
exports.getRestaurantById = function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	return res.jsonp([]);
};

//
// CREATES A RESTAURANT
//
exports.newRestaurant = function (req, res){
	var restaurant = new Restaurant(req.body);
	restaurant.save(function (err) {
		if (!err) {
			console.log("created");
			return res.status(201).jsonp(restaurant);
		} else {
			console.log(err);
			return res.send("error");
		}
	});
};

//
// UPDATES A RESTAURANT
//
exports.updateRestaurant = function(req, res){
	return res.status(501).send("not implemented");
};

//
// DELETE A RESTAURANT
//
exports.deleteRestaurant = function (req, res){
	console.log("delete");
	return Restaurant.findById(req.params.id, function (err, restaurant) {
		if (restaurant !== null) {
			return restaurant.remove(function (err) {
				if (!err) {
					console.log("removed");
					return res.send("removed");
				} else {
					console.log(err);
					return res.send("error on remove");
				}
			});
		} else {
			console.log(err);
			return res.send("don't fucking have this restaurant");
		}
	});
};