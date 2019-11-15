var express = require('express');
var rutasEditorial = express.Router();
var Editorial = require('../database/models/Editorial');

rutasEditorial.get('/', function(req, res) {
	Editorial.getEditoriales().then(respuesta => res.send(respuesta));
});

rutasEditorial.post('/', function(req, res) {
	const nuevaEditorial = req.body;
	Editorial.createEditorial(nuevaEditorial).then(respuesta =>
		res.send(respuesta)
	);
});

rutasEditorial.put('/', function(req, res) {
	const nuevaEditorial = req.body;
	Editorial.updateEditorial(nuevaEditorial).then(respuesta =>
		res.send(respuesta)
	);
});

rutasEditorial.delete('/', function(req, res) {
	const idEditorialABorrar = req.body.id_editorial;
	Editorial.deleteEditorial(idEditorialABorrar).then(respuesta =>
		res.send(respuesta)
	);
});

module.exports = rutasEditorial;
