/**
 * App dependencies.
 */
var express = require('express');
var _ = require('underscore');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');

/**
 * Start and config app.
 */
var app = express();
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Start DB.
 */
var db = mongoose.connect('mongodb://localhost/restaurant-guide');

// Bootstrap models and routes
require('./routes')(app, passport);

app.listen(3000, function(){
	console.log("running on 3000!");
	console.log(passport);
});