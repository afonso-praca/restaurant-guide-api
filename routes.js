module.exports = function(app, passport){
	/**
	 * Load controllers.
	 */
	var restaurants = require('./controllers/restaurant-controller');
	var domain = require('domain');
	var d = domain.create();

	d.on('error', function(err) {
		console.error(err);
	});

	/**
	 * Restaurants routes.
	 */
	d.run(function() {

		app.get('/auth/facebook', passport.authenticate('facebook'));
		app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: 'http://api.penedorj.com.br/auth/success', failureRedirect: 'http://api.penedorj.com.br/auth/failure' }));
		app.get('/auth/success', function(req, res) {
			res.send(req.user);
		});
		app.get('/auth/failure', function(req, res) {
			res.send('fail');
		});

		app.get('/restaurants', restaurants.getAllRestaurants);
		app.post('/restaurants', restaurants.newRestaurant);
		app.get('/restaurants/:id', restaurants.getRestaurantById);
		app.put('/restaurants/:id', restaurants.updateRestaurant);
		app.delete('/restaurants/:id', restaurants.deleteRestaurant);
	});
};