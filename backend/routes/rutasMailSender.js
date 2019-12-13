var express = require('express');
var rutasMailSender = express.Router();
var nodemailer = require('nodemailer');
let Pedido = require('../database/models/Pedido');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'libreria.tp.integracion@gmail.com',
		pass: 'tpintegracion123'
	}
});

var mailOptions = {
	from: 'libreria.tp.integracion@gmail.com'
};

rutasMailSender.post('/enviarMail', function(req, res) {
	Pedido.getMailUsuario(req.body.id_pedido).then(response => {
		const mail = response.mail;
		const subject = req.body.subject;
		const text = req.body.text;

		mailOptions = { ...mailOptions, subject, text, to: mail };
		transporter.sendMail(mailOptions, function(error, info) {
			if (error) console.log(error);
			else console.log('Mail enviado: ' + info.response);
		});
	});
});

module.exports = rutasMailSender;
