const pool = require('../database');
const estados = require('./estados');

//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from editorial;',
	INSERT: String.raw`INSERT INTO editorial("nombre_editorial") VALUES('{nombre_editorial}') RETURNING id_editorial;`,
	UPDATE: String.raw`UPDATE editorial SET nombre_editorial = '{nombre_editorial}' WHERE id_editorial='{id_editorial}';`,
	DELETE: String.raw`DELETE FROM editorial WHERE id_editorial={};`
};

let getEditoriales = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let editoriales = response.rows;

		return {
			status: editoriales ? estados.EXITO : estados.FRACASO,
			editoriales: editoriales
		};
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.CONEXION_FALLIDA };
		}
	}
};

let createEditorial = async nuevaEditorial => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevaEditorial));
		let filasModificadas = response.rowCount;
		let editorialCreada = filasModificadas > 0;

		if (editorialCreada) {
			const idEditorialCreada = response.rows[0].id_editorial;
			return {
				status: estados.EXITO,
				editorial: { ...nuevaEditorial, id_editorial: idEditorialCreada }
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

let updateEditorial = async editorialCambiada => {
	try {
		let response = await pool.query(querys.UPDATE.format(editorialCambiada));
		let filasModificadas = response.rowCount;
		let editorialActualizada = filasModificadas > 0;
		return { status: editorialActualizada ? estados.EXITO : estados.FRACASO };
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

let deleteEditorial = async idEditorial => {
	try {
		let response = await pool.query(querys.DELETE.format(idEditorial));
		let filasModificadas = response.rowCount;
		let editorialBorrada = filasModificadas > 0;
		return { status: editorialBorrada ? estados.EXITO : estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

module.exports = {
	getEditoriales,
	createEditorial,
	updateEditorial,
	deleteEditorial
};
