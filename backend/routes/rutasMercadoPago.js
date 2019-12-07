const mercadopago = require('mercadopago');
var express = require('express');
var rutasMercadoPago = express.Router();
// Agrega credenciales
mercadopago.configure({
	access_token: 'TEST-4505612896891010-120616-afd9094d5aa1134b3ccfc21bb52ef2d2-227241470'
});

// Crea un objeto de preferencia
let preference = {
	back_urls: {
		success: 'http://localhost:3000/checkout',
		pending: 'http://localhost:3000/',
		failure: 'http://localhost:3000/'
	},
	auto_return: 'all',
	items: []
};

rutasMercadoPago.post('/pagar', (req, res) => {
	let config = req.body;

	mercadopago.preferences
		.create({ ...preference, ...config })
		.then(function(response) {
			console.log(response);
			res.send(response);
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = rutasMercadoPago;
