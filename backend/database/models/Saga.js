const pool = require('../database');
const estados = require('./estados');

//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from saga;',
	INSERT: String.raw`INSERT INTO saga(nombre_saga) VALUES('{nombre_saga}') RETURNING id_saga;`,
	UPDATE: String.raw`UPDATE saga SET nombre_saga = '{nombre_saga}', stock_saga = '{stock_saga}'  WHERE id_saga='{id_saga}';`,
	DELETE: String.raw`DELETE FROM saga WHERE id_saga={};`
};

let getSagas = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let sagas = response.rows;

		return {
			status: sagas ? estados.EXITO : estados.FRACASO,
			sagas: sagas
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

let createSaga = async nuevaSaga => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevaSaga));
		let filasModificadas = response.rowCount;
		let sagaCreada = filasModificadas > 0;

		if (sagaCreada) {
			const idSagaCreada = response.rows[0].id_saga;
			return {
				status: estados.CREADO,
				saga: { ...nuevaSaga, id_saga: idSagaCreada, stock_saga: 0 }
			};
		} else return { status: estados.FRACASO };
	} catch (error) {
		console.log(error);
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

let updateSaga = async sagaCambiada => {
	try {
		let response = await pool.query(querys.UPDATE.format(sagaCambiada));
		let filasModificadas = response.rowCount;
		let sagaActualizada = filasModificadas > 0;
		return {
			status: sagaActualizada ? estados.ACTUALIZADO : estados.FRACASO
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

let deleteSaga = async idSaga => {
	try {
		let response = await pool.query(querys.DELETE.format(idSaga));
		let filasModificadas = response.rowCount;
		let sagaBorrada = filasModificadas > 0;
		return { status: sagaBorrada ? estados.BORRADO : estados.FRACASO };
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
	getSagas,
	createSaga,
	updateSaga,
	deleteSaga
};
