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

		app.get('/api/auth/facebook', passport.authenticate('facebook', {
			scope : [ "email", "basic_info" ]
		}));
		app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: 'http://penedorj.com.br/api/auth/success', failureRedirect: 'http://penedorj.com.br/api/auth/failure' }));
		app.get('/api/auth/success', function(req, res) {
			res.render('after-auth', { state: 'success', user: req.user ? req.user : null });
		});
		app.get('/api/auth/failure', function(req, res) {
			res.send('fail');
		});

		app.get('/api/restaurants', restaurants.getAllRestaurants);
		app.post('/api/restaurants', restaurants.newRestaurant);
		app.get('/api/restaurants/:id', restaurants.getRestaurantById);
		app.put('/api/restaurants/:id', restaurants.updateRestaurant);
		app.delete('/api/restaurants/:id', restaurants.deleteRestaurant);
	});
};