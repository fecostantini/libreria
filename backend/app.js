const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

//const { Libro } = require('./database/models/Libro');

// rutas
app.use(require('./routes'));

app.use(bodyParser.json());
app.use(cors());

/*
app.get('/Libro', function (req, res) {
  Libro.findAll().then(libros => {
    res.send(libros);
  });
});

app.get('/Libro', function(req, res) {
	Libro.findAll().then(libros => {
		res.send(libros);
	});
});

app.post('/Libro', (req, res) => {
	const isbn = parseInt(req.body.isbn);
	const libroACrear = {
		titulo: req.body.titulo,
		idioma: req.body.idioma,
		edicion: req.body.edicion,
		descripcion: req.body.descripcion,
		stock: parseInt(req.body.stock_libro)
	};
	Libro.findOrCreate({ where: { isbn: isbn }, defaults: libroACrear }).then(
		([libro, libroCreado]) => {
			console.log(libroCreado ? 'Nuevo libro creado!' : 'El libro ya existe!');

			res.send({
				creado: libroCreado,
				libro: libro
			});
		}
	);
});
/*
TODO: usando Libro.destroy borrar un libro.
app.delete()
*/

app.listen(3210, () => {
	console.log('Corriendo en el puerto 3210');
});
