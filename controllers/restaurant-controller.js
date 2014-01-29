var mongoose = require("mongoose");
var Restaurant = mongoose.model("Restaurant");
var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'AKIAIPJOG4GGLEMNQNFQ', secretAccessKey: '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'});

// Create an S3 client
var s3 = new AWS.S3();
var bucketName = 'restaurant-guide';

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
	console.log(req.files);
	restaurant.save(function (err) {
		if (!err) {
			var params = {Bucket: bucketName, Key: "hello-world.txt", Body: 'Hello World!'};
			s3.putObject(params, function(err, data) {
				if (err){
					console.log(err);
				} else {
					console.log("Successfully uploaded data to " + bucketName);
					console.log("created");
					return res.status(201).jsonp(restaurant);
				}
			});
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