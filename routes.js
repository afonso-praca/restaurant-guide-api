module.exports = function(app, passport){
	/**
	 * Controllers.
	 */
	var restaurants = require('./restaurant/restaurant-controller');

	/**
	 * Restaurants routes.
	 */
	app.get('/api/pvt/restaurants', restaurants.findAll);
};