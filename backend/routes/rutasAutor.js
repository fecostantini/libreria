var express = require('express');
var rutasAutor = express.Router();
var Autor = require('../database/models/Autor');

rutasAutor.get('/', function(req, res) {
	Autor.getAutores().then(autores => res.send(autores));
});

rutasAutor.post('/', function(req, res) {
	const nuevoAutor = req.body;
	Autor.createAutor(nuevoAutor).then(autorCreado => res.send(autorCreado));
});

rutasAutor.put('/', function(req, res) {
	const nuevoAutor = req.body;
	Autor.updateAutor(nuevoAutor).then(autorActualizado =>
		res.send(autorActualizado)
	);
});

module.exports = rutasAutor;
