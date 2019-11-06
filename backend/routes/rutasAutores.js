var express = require('express');
var routerAutores = express.Router();
var Autor = require('../database/models/Autor');

routerAutores.get('/', function(req, res) {
	Autor.getAutores().then(autores => res.send(autores));
});

module.exports = routerAutores;
