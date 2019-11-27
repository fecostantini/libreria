var express = require('express');
var rutasLogin = express.Router();
const passport = require('./index');
const { frontEndURL } = require('../config');

rutasLogin.get('/fracaso', (req, res) => {
	res.send('FRACASO');
});

rutasLogin.get('/auth/facebook', passport.authenticate('facebook'));
rutasLogin.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', { successRedirect: frontEndURL, failureRedirect: '/fracaso' })
);

module.exports = { rutasLogin, passport };
