var express = require('express');
var rutasUsuario = express.Router();
var Usuario = require('../database/models/Usuario');

rutasUsuario.get('/', function(req, res) {
	Usuario.getUsuarios().then(respuesta => res.send(respuesta));
});

rutasUsuario.get('/getById', function(req, res) {
	const idUsuario = req.body.id;
	Usuario.getUsuarioById(idUsuario).then(respuesta => res.send(respuesta));
});

rutasUsuario.get('/getByFacebookId', function(req, res) {
	const idUsuario = req.body.id;
	Usuario.getUsuarioByFacebookId(idUsuario).then(respuesta => res.send(respuesta));
});

rutasUsuario.post('/getByMailAndPassword', function(req, res) {
	const usuario = req.body;
	Usuario.getUsuarioByMailAndPassword(usuario).then(respuesta => res.send(respuesta));
});

rutasUsuario.post('/findOrCreateUsuario', function(req, res) {
	const nuevoUsuario = req.body;
	Usuario.findOrCreateUsuario(nuevoUsuario).then(respuesta => res.send(respuesta));
});

rutasUsuario.post('/', function(req, res) {
	const nuevoUsuario = req.body;
	Usuario.createUsuario(nuevoUsuario).then(respuesta => res.send(respuesta));
});

rutasUsuario.put('/', function(req, res) {
	const usuarioCambiado = req.body;
	Usuario.updateUsuario(usuarioCambiado).then(respuesta => res.send(respuesta));
});

module.exports = rutasUsuario;
