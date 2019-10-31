const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { Libro } = require('./database/models/Libro');


app.use(bodyParser.json());
app.use(cors());

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
