var express = require('express');
var rutasLibro = express.Router();
var Libro = require('../database/models/Libro');

/*
rutasLibro.get('/', function(req, res) {
	Libro.getLibros().then(libros => res.send(libros));
});
*/
rutasLibro.post('/', function(req, res) {
	const nuevoLibro = req.body;
	Libro.createLibro(nuevoLibro).then(respuesta => res.send(respuesta));
});
/*
rutasLibro.put('/', function(req, res) {
	const nuevoLibro = req.body;
	Libro.updateLibro(nuevoLibro).then(respuesta => res.send(respuesta));
});

rutasLibro.delete('/', function(req, res) {
	const idLibroABorrar = req.body.id_libro;
	Libro.deleteLibro(idLibroABorrar).then(respuesta => res.send(respuesta));
});
*/
module.exports = rutasLibro;
