const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

var formatearArray = array => {
	arrayStr = String.raw``;
	array.forEach((elemento, i) => {
		arrayStr += String.raw`'${elemento}'`;
		if (i + 1 !== array.length) arrayStr += String.raw`, `;
	});

	return arrayStr;
};

const querys = {
	INSERT: String.raw`call new_libro({isbn}, '{idioma}', '{titulo}', {precio}, '{edicion}', '{descripcion}', {id_editorial}, array[{autores}], array[{categorias}]);`
};

let createLibro = async nuevoLibro => {
	try {
		// Formatea los arrays de manera que se pueda formatear la consulta
		nuevoLibro = {
			...nuevoLibro,
			autores: formatearArray(nuevoLibro.autores),
			categorias: formatearArray(nuevoLibro.categorias)
		};

		let response = await pool.query(querys.INSERT.format(nuevoLibro));
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

module.exports = { createLibro };
