var express = require('express');
var rutasSaga = express.Router();
var Saga = require('../database/models/Saga');

rutasSaga.get('/', function(req, res) {
	Saga.getSagas().then(respuesta => res.send(respuesta));
});

rutasSaga.post('/', function(req, res) {
	const nuevaSaga = req.body;
	Saga.createSaga(nuevaSaga).then(respuesta => res.send(respuesta));
});

rutasSaga.put('/', function(req, res) {
	const nuevaSaga = req.body;
	Saga.updateSaga(nuevaSaga).then(respuesta => res.send(respuesta));
});

rutasSaga.delete('/', function(req, res) {
	const idSagaABorrar = req.body.id_saga;
	Saga.deleteSaga(idSagaABorrar).then(respuesta => res.send(respuesta));
});

module.exports = rutasSaga;
