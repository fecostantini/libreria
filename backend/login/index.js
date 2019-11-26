const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./config');

let user = {};

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.FACEBOOK.clientID,
			clientSecret: keys.FACEBOOK.clientSecret,
			callbackURL: '/auth/facebook/callback'
		},
		function(accessToken, refreshToken, profile, cb) {
			user = { ...profile };
			return cb(null, profile);
		}
	)
);

module.exports = passport;
