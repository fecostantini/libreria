var express = require('express');
var rutasProducto = express.Router();
var Producto = require('../database/models/Producto');

rutasProducto.get('/', function(req, res) {
	Producto.getProductos().then(respuesta => res.send(respuesta));
});

rutasProducto.post('/', function(req, res) {
	const nuevoProducto = req.body;
	Producto.createProducto(nuevoProducto).then(respuesta => res.send(respuesta));
});

rutasProducto.post('/getInfo', function(req, res) {
	const idProducto = req.body.id_producto;
	Producto.getDatosProducto(idProducto).then(respuesta => res.send(respuesta));
});

module.exports = rutasProducto;
