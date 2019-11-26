var express = require('express');
var rutasUsuario = express.Router();
var Usuario = require('../database/models/Usuario');

rutasUsuario.get('/', function(req, res) {
	const { tipoID, id } = req.body;
	Usuario.getUsuarios(tipoID, id).then(respuesta => res.send(respuesta));
});

rutasUsuario.post('/', function(req, res) {
	const nuevoUsuario = req.body;
	Usuario.createUsuario(nuevoUsuario).then(respuesta => res.send(respuesta));
});

module.exports = rutasUsuario;
