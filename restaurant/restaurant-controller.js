var restaurants = require('./mock.json');
var _ = require('underscore');

exports.findAll = function(req, res){
	res.set({ 'X-Developer-Github-User': 'afonso-praca' });
	return res.json(restaurants);
};