const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');

const querys = {
	GET_ALL: 'select * from fotocopia;'
};

let getFotocopias = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let fotocopias = response.rows;

		if (fotocopias.length)
			return {
				status: estados.EXITO,
				fotocopias
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

module.exports = { getFotocopias };
