var express = require('express');
var rutasCarrito = express.Router();
var Carrito = require('../database/models/Carrito');

rutasCarrito.post('/getCarritoActivo', function(req, res) {
	const idUsuario = req.body.id_usuario;
	Carrito.getCarritoActivo(idUsuario).then(respuesta => res.send(respuesta));
});

rutasCarrito.post('/agregarProducto', function(req, res) {
	const infoProducto = req.body;
	Carrito.añadirAlCarrito(infoProducto).then(respuesta => res.send(respuesta));
});

rutasCarrito.post('/getCantidadElementos', function(req, res) {
	const idCarrito = req.body.id_carrito;
	Carrito.getCantidadElementosCarrito(idCarrito).then(respuesta => res.send(respuesta));
});

rutasCarrito.post('/getElementos', function(req, res) {
	const idCarrito = req.body.id_carrito;
	Carrito.getProductosCarrito(idCarrito).then(respuesta => res.send(respuesta));
});

rutasCarrito.post('/realizarCheckout', function(req, res) {
	const idCarrito = req.body.id_carrito;
	Carrito.realizarCheckout(idCarrito).then(respuesta => res.send(respuesta));
});

rutasCarrito.post('/getCarritosByIdUsuario', function(req, res) {
	const idUsuario = req.body.id_usuario;
	Carrito.getCarritosByIdUsuario(idUsuario).then(respuesta => res.send(respuesta));
});

rutasCarrito.post('/', function(req, res) {
	const idUsuario = req.body.id_usuario;
	Carrito.createCarrito(idUsuario).then(respuesta => res.send(respuesta));
});

rutasCarrito.put('/desactivarCarrito', function(req, res) {
	const idCarritoADesactivar = req.body.id_carrito;
	Carrito.desactivarCarrito(idCarritoADesactivar).then(respuesta => res.send(respuesta));
});

module.exports = rutasCarrito;
