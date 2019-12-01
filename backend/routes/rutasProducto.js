var express = require('express');
var rutasProducto = express.Router();
var Producto = require('../database/models/Producto');

rutasProducto.get('/', function(req, res) {
	Producto.getProductos().then(respuesta => res.send(respuesta));
});

module.exports = rutasProducto;
