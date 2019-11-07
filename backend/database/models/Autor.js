const pool = require('../database');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from autor;',
	INSERT: String.raw`INSERT INTO autor("autor","nacionalidad") VALUES('{autor}','{nacionalidad}') RETURNING id_autor;`,
	UPDATE: String.raw`UPDATE autor SET autor = '{autor}', nacionalidad='{nacionalidad}' WHERE id_autor='{id_autor}';`,
	DELETE: String.raw`DELETE FROM autor WHERE id_autor={};`
};

const errores = {
	AUTOR_YA_EXISTE: '23505',
	CONEXION_FALLIDA: 'ECONNREFUSED'
};

let getAutores = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let autores = response.rows;
		return {
			status: autores ? 'EXITO' : 'FRACASO',
			autores: autores
		};
	} catch (error) {
		switch (error.code) {
			case errores.CONEXION_FALLIDA:
				return { status: 'CONEXION_FALLIDA' };
			default:
				return { status: 'ERROR_DESCONOCIDO' };
		}
	}
};

// EXITO si lo inserta y autor es el autor que se insertó
// AUTOR_YA_EXISTE si falla porque ya existe el autor con ese nombre y nacionalidad
// FRACASO si no inserta nada
// ERROR_DESCONOCIDO si ocurre otra cosa imprevista
let createAutor = async nuevoAutor => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevoAutor));
		let filasModificadas = response.rowCount;
		let autorCreado = filasModificadas > 0;

		if (autorCreado) {
			const idAutorCreado = response.rows[0].id_autor;
			return {
				status: 'EXITO',
				autor: { ...nuevoAutor, id_autor: idAutorCreado }
			};
		} else return { status: 'FRACASO' };
	} catch (error) {
		switch (error.code) {
			case errores.AUTOR_YA_EXISTE:
				return { status: 'AUTOR_YA_EXISTE' };
			case errores.CONEXION_FALLIDA:
				return { status: 'CONEXION_FALLIDA' };
			default:
				return { status: 'ERROR_DESCONOCIDO' };
		}
	}
};

// EXITO si lo actualiza
// AUTOR_YA_EXISTE si falla porque ya existe el autor con ese nombre y nacionalidad
// FRACASO si no lo encuentra
// ERROR_DESCONOCIDO si ocurre otra cosa imprevista
let updateAutor = async autorCambiado => {
	try {
		let response = await pool.query(querys.UPDATE.format(autorCambiado));
		let filasModificadas = response.rowCount;
		let autorActualizado = filasModificadas > 0;
		return { status: autorActualizado ? 'EXITO' : 'FRACASO' };
	} catch (error) {
		switch (error.code) {
			case errores.AUTOR_YA_EXISTE:
				return { status: 'AUTOR_YA_EXISTE' };
			case errores.CONEXION_FALLIDA:
				return { status: 'CONEXION_FALLIDA' };
			default:
				return { status: 'ERROR_DESCONOCIDO' };
		}
	}
};

// EXITO si lo borra
// FRACASO si no lo encuentra
// ERROR_DESCONOCIDO si ocurre otra cosa imprevista
let deleteAutor = async idAutor => {
	try {
		let response = await pool.query(querys.DELETE.format(idAutor));
		let filasModificadas = response.rowCount;
		let autorBorrado = filasModificadas > 0;
		return { status: autorBorrado ? 'EXITO' : 'FRACASO' };
	} catch (error) {
		switch (error.code) {
			case errores.CONEXION_FALLIDA:
				return { status: 'CONEXION_FALLIDA' };
			default:
				return { status: 'ERROR_DESCONOCIDO' };
		}
	}
};

module.exports = { getAutores, createAutor, updateAutor, deleteAutor };
