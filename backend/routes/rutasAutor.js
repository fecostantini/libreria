var express = require('express');
var rutasAutor = express.Router();
var Autor = require('../database/models/Autor');

rutasAutor.get('/', function(req, res) {
	Autor.getAutores().then(autores => res.send(autores));
});

rutasAutor.post('/', function(req, res) {
	const nuevoAutor = req.body;
	Autor.createAutor(nuevoAutor).then(respuesta => res.send(respuesta));
});

rutasAutor.put('/', function(req, res) {
	const nuevoAutor = req.body;
	Autor.updateAutor(nuevoAutor).then(respuesta => res.send(respuesta));
});

rutasAutor.delete('/', function(req, res) {
	const idAutorABorrar = req.body.id_autor;
	Autor.deleteAutor(idAutorABorrar).then(respuesta => res.send(respuesta));
});

module.exports = rutasAutor;
