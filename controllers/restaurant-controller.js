var mongoose = require("mongoose");
var Restaurant = mongoose.model("Restaurant");
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');

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
	return Restaurant.find({ _id: req.params.id }, function (err, restaurants){
		if (!err) {
			return res.jsonp(restaurants[0]);
		} else {
			console.log(err);
			return res.send("no restaurant found");
		}
	});
};

//
// CREATES A RESTAURANT
//
exports.newRestaurant = function (req, res){
	console.log(req.files);
	if (req.files.image){
		var tempPath = req.files.image.path;
		var newImageName = String(uuid.v4()) + ".jpg";
		fs.readFile(tempPath, function (err, data){
			if (err) { throw err; }
			var params = {
				Bucket: bucketName,
				Key: newImageName,
				Body: data,
				ACL:'public-read'
			};
			s3.putObject(params,function(err, data){
				if (!err) {
					console.log("Successfully uploaded data to " + bucketName);
					self.createRestaurant(req, res, newImageName);
				} else {
					console.log(err);
					self.createRestaurant(req, res, null);
				}
			});
		});
	} else {
		self.createRestaurant(req, res, null);
	}
};

self.createRestaurant = function(req, res, newImageName){
	var restaurant = new Restaurant(req.body);
	if (newImageName !== null)
		restaurant.image = "http://s3-us-west-2.amazonaws.com/restaurant-guide/" + newImageName;
	restaurant.save(function (err) {
		if (!err) {
			console.log("created");
			return res.status(201).jsonp(restaurant);
		} else {
			console.log(err);
			return res.send("error on creating the restaurant");
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
			return res.send("no restaurant found");
		}
	});
};