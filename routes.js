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
	app.get('/api/pvt/restaurants/:id', restaurants.getRestaurantById);
	app.put('/api/pvt/restaurants/:id', restaurants.updateRestaurant);
	app.delete('/api/pvt/restaurants/:id', restaurants.deleteRestaurant);
};