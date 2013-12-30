module.exports = function(app, passport){
	/**
	 * Controllers.
	 */
	var restaurants = require('./controllers/restaurant-controller');

	/**
	 * Restaurants routes.
	 */
	app.get('/api/pvt/restaurants', restaurants.getAllRestaurants);
	app.post('/api/pvt/restaurants', restaurants.newRestaurant);
};