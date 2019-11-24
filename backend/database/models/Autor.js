const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from autor;',
	INSERT: String.raw`INSERT INTO autor("autor","nacionalidad") VALUES('{autor}','{nacionalidad}') RETURNING id_autor;`,
	UPDATE: String.raw`UPDATE autor SET autor = '{autor}', nacionalidad='{nacionalidad}' WHERE id_autor='{id_autor}';`,
	DELETE: String.raw`DELETE FROM autor WHERE id_autor={};`
};

let getAutores = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let autores = response.rows;
		return {
			status: autores ? estados.EXITO : estados.FRACASO,
			autores: autores
		};
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let createAutor = async nuevoAutor => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevoAutor));
		let filasModificadas = response.rowCount;
		let autorCreado = filasModificadas > 0;

		if (autorCreado) {
			const idAutorCreado = response.rows[0].id_autor;
			return {
				status: estados.CREADO,
				autor: { ...nuevoAutor, id_autor: idAutorCreado }
			};
		} else return { status: estados.FRACASO };
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

let updateAutor = async autorCambiado => {
	try {
		let response = await pool.query(querys.UPDATE.format(autorCambiado));
		let filasModificadas = response.rowCount;
		let autorActualizado = filasModificadas > 0;
		return { status: autorActualizado ? estados.ACTUALIZADO : estados.FRACASO };
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

let deleteAutor = async idAutor => {
	try {
		let response = await pool.query(querys.DELETE.format(idAutor));
		let filasModificadas = response.rowCount;
		let autorBorrado = filasModificadas > 0;
		return { status: autorBorrado ? estados.BORRADO : estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

module.exports = { getAutores, createAutor, updateAutor, deleteAutor };
