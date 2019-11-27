const Usuario = require('../database/models/Usuario');
const passport = require('passport');
const estados = require('../database/models/estados');
const FacebookStrategy = require('passport-facebook');
const keys = require('../config');

passport.serializeUser((usuario, done) => {
	done(null, usuario);
});

passport.deserializeUser((usuario, done) => {
	done(null, usuario);
});

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.FACEBOOK.clientID,
			clientSecret: keys.FACEBOOK.clientSecret,
			callbackURL: '/auth/facebook/callback'
		},
		function(accessToken, refreshToken, profile, done) {
			console.log(profile);

			Usuario.getUsuarioByFacebookId(profile.id).then(res => {
				if (res.status === estados.EXITO) {
					return done(null, res.usuario);
				} else {
					let nuevoUsuario = {
						id_facebook: profile.id,
						nombre: profile.displayName
					};
					Usuario.createUsuario(nuevoUsuario).then(res => {
						console.log(res.usuario);
						if (res.status === estados.CREADO) return done(null, res.usuario);
						else return done(res.error);
					});
				}
			});
		}
	)
);

module.exports = passport;
