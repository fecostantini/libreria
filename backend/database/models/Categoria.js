const pool = require('../database');
const estados = require('./estados');

//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from categoria;',
	INSERT: String.raw`INSERT INTO categoria("nombre_categoria") VALUES('{nombre_categoria}') RETURNING id_categoria;`,
	UPDATE: String.raw`UPDATE categoria SET nombre_categoria = '{nombre_categoria}' WHERE id_categoria='{id_categoria}';`,
	DELETE: String.raw`DELETE FROM categoria WHERE id_categoria={};`
};

let getCategorias = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let categorias = response.rows;

		return {
			status: categorias ? estados.EXITO : estados.FRACASO,
			categorias: categorias
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

let createCategoria = async nuevaCategoria => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevaCategoria));
		let filasModificadas = response.rowCount;
		let categoriaCreada = filasModificadas > 0;

		if (categoriaCreada) {
			const idCategoriaCreada = response.rows[0].id_categoria;
			return {
				status: estados.CREADO,
				categoria: { ...nuevaCategoria, id_categoria: idCategoriaCreada }
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

let updateCategoria = async categoriaCambiada => {
	try {
		let response = await pool.query(querys.UPDATE.format(categoriaCambiada));
		let filasModificadas = response.rowCount;
		let categoriaActualizada = filasModificadas > 0;
		return {
			status: categoriaActualizada ? estados.ACTUALIZADO : estados.FRACASO
		};
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

let deleteCategoria = async idCategoria => {
	try {
		let response = await pool.query(querys.DELETE.format(idCategoria));
		let filasModificadas = response.rowCount;
		let categoriaBorrada = filasModificadas > 0;
		return { status: categoriaBorrada ? estados.BORRADO : estados.FRACASO };
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
	getCategorias,
	createCategoria,
	updateCategoria,
	deleteCategoria
};
