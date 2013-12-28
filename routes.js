module.exports = function(app){
	/**
	 * Controllers.
	 */
	var restaurants = require('./restaurant/restaurant-controller');

	/**
	 * Restaurants routes.
	 */
	app.get('/api/pvt/restaurants', restaurants.findAll);
};