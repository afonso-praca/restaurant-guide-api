/**
 * App dependencies.
 */
var express = require('express');
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
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: __dirname + '/files'
}));
app.use(express.limit('5mb'));
app.use(express.session({
	secret: 'SECRET',
	key: "sessionId"
}));
app.use(passport.initialize());
app.use(passport.session());
app.disable("x-powered-by");

/**
 * Start DB.
 */
var db = mongoose.connect('mongodb://localhost/restaurant-guide');

//
// PASSPORT
//
require('./config/passport')(passport, "606767286070551", "5b80d62592514165eeda0d057f8a2bb0");

// Bootstrap models and routes
require("./models/Restaurant");
require('./routes')(app, passport);

app.listen(3000, function(){
	console.log("running on 3000!");
});