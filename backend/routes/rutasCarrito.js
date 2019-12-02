var express = require('express');
var rutasCarrito = express.Router();
var Carrito = require('../database/models/Carrito');

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
