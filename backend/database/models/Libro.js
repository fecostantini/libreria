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
	INSERT: String.raw`call new_libro({isbn}, '{idioma}', '{titulo}', {stock}, {precio}, '{edicion}', '{descripcion}', {id_editorial}, {id_saga}, array[{autores}], array[{categorias}]);`,
	PUNTUAR: String.raw`INSERT INTO valoracion("puntaje", "id_usuario", "isbn") VALUES ({puntaje}, {id_usuario}, {isbn}) RETURNING id_valoracion;`,
	GET_PUNTUACION_USUARIO: String.raw`select * from valoracion where (id_usuario={id_usuario} and isbn={isbn});`,
	GET_PUNTAJE_PROMEDIO: String.raw`select avg(puntaje) as puntaje_promedio from valoracion where (isbn={});`
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

let puntuarLibro = async infoPuntaje => {
	try {
		let response = await pool.query(querys.PUNTUAR.format(infoPuntaje));
		let filasModificadas = response.rowCount;
		let libroPuntuado = filasModificadas > 0;
		if (libroPuntuado)
			return {
				puntuacion: { ...infoPuntaje, id_valoracion: response.rows[0].id_valoracion },
				status: estados.CREADO
			};
		else return { status: estados.FRACASO };
	} catch (error) {
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

let getPuntuacionUsuarioLibro = async infoPuntaje => {
	try {
		let response = await pool.query(querys.GET_PUNTUACION_USUARIO.format(infoPuntaje));
		let filasModificadas = response.rowCount;
		let tienePuntuacion = filasModificadas > 0;
		if (tienePuntuacion)
			return {
				puntuacion: response.rows[0],
				status: estados.EXITO
			};
		else return { status: estados.FRACASO };
	} catch (error) {
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

let getPuntajePromedioLibro = async isbn => {
	try {
		let response = await pool.query(querys.GET_PUNTAJE_PROMEDIO.format(isbn));
		let filasModificadas = response.rowCount;
		let tienePuntuaciones = filasModificadas > 0;
		if (tienePuntuaciones)
			return {
				puntaje_promedio: response.rows[0].puntaje_promedio,
				status: estados.EXITO
			};
		else return { status: estados.FRACASO };
	} catch (error) {
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
module.exports = { getLibros, createLibro, puntuarLibro, getPuntuacionUsuarioLibro, getPuntajePromedioLibro };
