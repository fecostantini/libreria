const pool = require('../database');
const estados = require('./estados');

//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL_BY_USER_ID: String.raw`select * from carrito where id_usuario='{}';`,
	INSERT: String.raw`INSERT INTO carrito("id_usuario") VALUES('{}') RETURNING id_carrito;`,
	DESACTIVAR_CARRITO: String.raw`UPDATE carrito SET activo=False where id_carrito={}`
};

let getCarritosByIdUsuario = async idUsuario => {
	try {
		let response = await pool.query(querys.GET_ALL_BY_USER_ID.format(idUsuario));
		let carritos = response.rows;

		return {
			status: carritos ? estados.EXITO : estados.FRACASO,
			carritos: carritos
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

let createCarrito = async idUsuario => {
	try {
		let response = await pool.query(querys.INSERT.format(idUsuario));
		let filasModificadas = response.rowCount;
		let carritoCreado = filasModificadas > 0;

		if (carritoCreado) {
			const idCarritoCreado = response.rows[0].id_carrito;
			return {
				status: estados.CREADO,
				carrito: { id_usuario: idUsuario, id_carrito: idCarritoCreado, activo: true }
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

let desactivarCarrito = async idCarrito => {
	try {
		let response = await pool.query(querys.DESACTIVAR_CARRITO.format(idCarrito));
		let filasModificadas = response.rowCount;
		let carritoActualizado = filasModificadas > 0;
		return {
			status: carritoActualizado ? estados.ACTUALIZADO : estados.FRACASO
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

module.exports = {
	getCarritosByIdUsuario,
	createCarrito,
	desactivarCarrito
};
