var express = require('express');
var rutasPedido = express.Router();
var Pedido = require('../database/models/Pedido');

rutasPedido.post('/getPedidos', function(req, res) {
	const tipoPedidos = req.body.tipo_pedidos;
	Pedido.getPedidos(tipoPedidos).then(respuesta => res.send(respuesta));
});

rutasPedido.post('/nuevoPedido', function(req, res) {
	const nuevoPedido = req.body;
	Pedido.createPedido(nuevoPedido).then(respuesta => res.send(respuesta));
});

rutasPedido.put('/pagarPedido', function(req, res) {
	const idPedido = req.body.id_pedido;
	Pedido.pagarPedido(idPedido).then(respuesta => res.send(respuesta));
});

rutasPedido.put('/aceptarORechazarPedido', function(req, res) {
	const idPedido = req.body.id_pedido;
	const decision = req.body.decision;
	Pedido.aceptarORechazarPedido(idPedido, decision).then(respuesta => res.send(respuesta));
});

rutasPedido.post('/getPedidosUsuario', function(req, res) {
	const idUsuario = req.body.id_usuario;
	Pedido.getPedidosUsuario(idUsuario).then(respuesta => res.send(respuesta));
});

module.exports = rutasPedido;
