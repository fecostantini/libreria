const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

var formatearArray = array => {
	arrayStr = String.raw``;
	array.forEach((elemento, i) => {
		arrayStr += String.raw`${elemento}`;
		if (i + 1 !== array.length) arrayStr += String.raw`,`;
	});

	return arrayStr;
};

const querys = {
	GET_ALL: 'select * from libro;',
	INSERT: String.raw`call new_libro({isbn}, '{idioma}', '{titulo}', {stock}, {precio}, '{edicion}', '{descripcion}', {id_editorial}, {id_saga}, array[{autores}], array[{categorias}]);`
};

let getLibros = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let libros = response.rows;

		if (libros.length)
			return {
				status: estados.EXITO,
				libros
			};
		else return { status: estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let createLibro = async nuevoLibro => {
	try {
		// Formatea los arrays de manera que se pueda formatear la consulta
		const nuevoLibroFormateado = {
			...nuevoLibro,
			autores: formatearArray(nuevoLibro.autores),
			categorias: formatearArray(nuevoLibro.categorias)
		};

		let response = await pool.query(querys.INSERT.format(nuevoLibroFormateado));
		if (response) {
			return {
				status: estados.EXITO,
				libro: nuevoLibro
			};
		}
	} catch (error) {
		console.log(error);
		console.log(error.code);
		switch (error.code) {
			case estados.YA_EXISTE:
				return { status: estados.YA_EXISTE };
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

module.exports = { getLibros, createLibro };
