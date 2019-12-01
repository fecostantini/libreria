var express = require('express');
var rutasPromocion = express.Router();
var Promocion = require('../database/models/Promocion');

rutasPromocion.get('/', function(req, res) {
	Promocion.getPromociones().then(respuesta => res.send(respuesta));
});

module.exports = rutasPromocion;
