/**
 * App dependencies.
 */
var express = require('express');
var _ = require('underscore');
var path = require('path');
var mongoose = require('mongoose');
var pkg = require('./package.json');

/**
 * Start and config app.
 */
var app = express();
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());

/**
 * Start DB.
 */
var db = mongoose.connect('mongodb://localhost/restaurant-guide');

// Bootstrap models and routes
require('./routes')(app);

app.listen(3000, function(){
	 console.log("running on 3000!");
});