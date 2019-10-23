const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { Libro } = require('./database/models/Libro');

app.use(bodyParser.json());
app.use(cors());

app.get('/Libro', function(req, res) {
	Libro.findAll().then(libros => {
		console.log(libros);
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
		stock_libro: parseInt(req.body.stock_libro)
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
app.post('/data', function(req, res) {
	Ninja.create({
		nombre: req.body.nombre,
		edad: req.body.edad
	}).then(ninja => {
		console.log('Datos recibidos!', ninja.dataValues);
		res.send({
			status: 'Datos ingresados exitosamente!',
			nombre: req.body.nombre,
			edad: req.body.edad
		});
	});
});
*/

app.listen(3210, () => {
	console.log('Corriendo en el puerto 3210');
});

/*
Libro.findAll().then(libros => {
	libros.forEach(libro => {
		console.log(libro.dataValues);
	});
});
*/
