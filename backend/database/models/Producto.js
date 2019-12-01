const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from producto;'
};

let getProductos = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let productos = response.rows;

		if (productos.length)
			return {
				status: estados.EXITO,
				productos
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
	getProductos
};
