var mongoose = require("mongoose");
var Restaurant = mongoose.model("Restaurant");
var AWS = require('aws-sdk');
// AWS.config.update({accessKeyId: '...', secretAccessKey: '...'});

// Create an S3 client
var s3 = new AWS.S3();
var bucketName = 'restaurant-guide';

var self = this;

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
			console.log("created");
			self.uploadToAWS(req, res, restaurant);
			return false;
		} else {
			console.log(err);
			return res.send("error");
		}
	});
};

self.uploadToAWS = function(req, res, restaurant){
	var params = {
		Bucket: bucketName,
		Key: "hello-world22.txt",
		Body: 'Hello World!',
		ACL:'public-read'
	};
	s3.putObject(params, function(err, data) {
		if (!err) {
			console.log("Successfully uploaded data to " + bucketName);
			return res.status(201).jsonp(restaurant);
		} else {
			console.log(err);
			return false;
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