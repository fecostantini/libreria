const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from promocion;'
};

let getPromociones = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let promociones = response.rows;

		if (promociones.length)
			return {
				status: estados.EXITO,
				promociones
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

module.exports = {
	getPromociones
};
