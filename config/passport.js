var User = require('../models/User'),
	FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport, facebookAppId, facebookAppSecret) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({ _id: id }, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		clientID: facebookAppId,
		clientSecret: facebookAppSecret,
		callbackURL: 'http://api.penedorj.com.br/auth/facebook/callback',
		profileURL: 'https://graph.facebook.com/me?fields=email,location,first_name,last_name,middle_name,name,link,username,work,education,gender,timezone,locale,verified,picture,about,address,age_range,bio,birthday,cover,currency,devices,email,favorite_athletes,id,hometown,favorite_teams,inspirational_people,install_type,installed,interested_in,languages,meeting_for,name_format,political,quotes,relationship_status,religion,significant_other,sports,updated_time,website'
	}, function(accessToken, refreshToken, profile, done) {
		console.log(profile);
		User.findOne({ 'facebook.id': profile.id }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				user = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					username: profile.username,
					user_image: profile.photos[0].value,
					facebook_id: profile.id,
					facebook: profile._json
				});
				user.save(function (err) {
					if (err) {
						console.log(err);
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		});
	}));
};