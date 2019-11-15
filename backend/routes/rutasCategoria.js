var express = require('express');
var rutasCategoria = express.Router();
var Categoria = require('../database/models/Categoria');

rutasCategoria.get('/', function(req, res) {
	Categoria.getCategorias().then(respuesta => res.send(respuesta));
});

rutasCategoria.post('/', function(req, res) {
	const nuevaCategoria = req.body;
	Categoria.createCategoria(nuevaCategoria).then(respuesta =>
		res.send(respuesta)
	);
});

rutasCategoria.put('/', function(req, res) {
	const nuevaCategoria = req.body;
	Categoria.updateCategoria(nuevaCategoria).then(respuesta =>
		res.send(respuesta)
	);
});

rutasCategoria.delete('/', function(req, res) {
	const idCategoriaABorrar = req.body.id_categoria;
	Categoria.deleteCategoria(idCategoriaABorrar).then(respuesta =>
		res.send(respuesta)
	);
});

module.exports = rutasCategoria;
