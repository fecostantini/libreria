var express = require('express');
var rutasFotocopia = express.Router();
var Fotocopia = require('../database/models/Fotocopia');

rutasFotocopia.get('/', function(req, res) {
	Fotocopia.getFotocopias().then(fotocopias => res.send(fotocopias));
});

module.exports = rutasFotocopia;
