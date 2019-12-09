var express = require('express');
var rutasLibro = express.Router();
var Libro = require('../database/models/Libro');

rutasLibro.get('/', function(req, res) {
	Libro.getLibros().then(libros => res.send(libros));
});

rutasLibro.post('/', function(req, res) {
	const nuevoLibro = req.body;
	Libro.createLibro(nuevoLibro).then(respuesta => res.send(respuesta));
});

rutasLibro.post('/puntuarLibro', function(req, res) {
	const infoPuntuacion = req.body;
	Libro.puntuarLibro(infoPuntuacion).then(respuesta => res.send(respuesta));
});

rutasLibro.post('/getPuntajeLibro', function(req, res) {
	const infoPuntuacion = req.body;
	Libro.getPuntuacionUsuarioLibro(infoPuntuacion).then(respuesta => res.send(respuesta));
});

rutasLibro.post('/getPuntajePromedio', function(req, res) {
	const isbn = req.body.isbn;
	Libro.getPuntajePromedioLibro(isbn).then(respuesta => res.send(respuesta));
});

module.exports = rutasLibro;
