const pool = require('../database');
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

const errores = {
	YA_EXISTE: '23505',
	CONEXION_FALLIDA: 'ECONNREFUSED'
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
				status: 'EXITO',
				libro: nuevoLibro
			};
		}
	} catch (error) {
		console.log(error);
		console.log(error.code);
		switch (error.code) {
			case errores.YA_EXISTE:
				return { status: 'YA_EXISTE' };
			case errores.CONEXION_FALLIDA:
				return { status: 'CONEXION_FALLIDA' };
			default:
				return { status: 'ERROR_DESCONOCIDO' };
		}
	}
};

module.exports = { createLibro };
