const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
	res.header(
		'Access-Control-Allow-Methods',
		'POST, PUT, GET, DETELETE, OPTIONS'
	);
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // actualizar para que coincida con el dominio de la aplicación que hace las peticiones
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// rutas
app.use(require('./routes'));

app.listen(3210, () => {
	console.log('Corriendo en el puerto 3210');
});
