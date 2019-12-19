const pool = require('../database');
const estados = require('./estados');

//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	// GET_ALL_BY_USER_ID: String.raw`select * from carrito where id_usuario='{}';`,
	GET_ID_CARRITO_ACTIVO: String.raw`select * from carrito where id_usuario='{}' and activo=True;`,
	AÑADIR_PRODUCTO_AL_CARRITO: String.raw`select * from añadir_al_carrito({id_producto}, {cantidad}, {id_carrito});`,
	ELIMINAR_PRODUCTO_DEL_CARRITO: String.raw`select * from eliminar_del_carrito({id_producto}, {id_carrito});`,
	GET_CANTIDAD_ELEMENTOS_CARRITO: String.raw`select * from cantidad_productos_carrito({});`,
	GET_ELEMENTOS_CARRITO: String.raw`select * from productos_carrito({});`,
	REALIZAR_CHECKOUT: String.raw`call confirmar_compra({});`,
	GET_COMPRAS_USUARIO: String.raw`select * from compras_usuario({});`
	// INSERT: String.raw`INSERT INTO carrito("id_usuario") VALUES('{}') RETURNING id_carrito;`,
	// DESACTIVAR_CARRITO: String.raw`UPDATE carrito SET activo=False where id_carrito={}`
};

let getCarritoActivo = async idUsuario => {
	try {
		let response = await pool.query(querys.GET_ID_CARRITO_ACTIVO.format(idUsuario));
		let carritoEncontrado = response.rowCount > 0;

		if (carritoEncontrado)
			return {
				status: estados.EXITO,
				id_carrito: response.rows[0].id_carrito
			};
		else return { status: estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.CONEXION_FALLIDA };
		}
	}
};

let añadirAlCarrito = async infoProducto => {
	try {
		console.log(querys.AÑADIR_PRODUCTO_AL_CARRITO.format(infoProducto));
		let response = await pool.query(querys.AÑADIR_PRODUCTO_AL_CARRITO.format(infoProducto));
		let filasModificadas = response.rowCount;
		let productoAgregado = filasModificadas > 0;
		return {
			status: productoAgregado ? estados.CREADO : estados.FRACASO
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

let getCantidadElementosCarrito = async idCarrito => {
	try {
		let response = await pool.query(querys.GET_CANTIDAD_ELEMENTOS_CARRITO.format(idCarrito));

		if (response)
			return {
				status: estados.EXITO,
				cantidad: response.rows[0].cantidad_productos_carrito
			};
		else return { status: estados.FRACASO };
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.CONEXION_FALLIDA };
		}
	}
};

let getProductosCarrito = async idCarrito => {
	try {
		let response = await pool.query(querys.GET_ELEMENTOS_CARRITO.format(idCarrito));
		let respuestaObtenida = response.rowCount > 0;

		if (respuestaObtenida)
			return {
				status: estados.EXITO,
				elementos: response.rows
			};
		else return { status: estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.CONEXION_FALLIDA };
		}
	}
};

let realizarCheckout = async idCarrito => {
	try {
		console.log(querys.REALIZAR_CHECKOUT.format(idCarrito));
		let response = await pool.query(querys.REALIZAR_CHECKOUT.format(idCarrito));
		let respuestaObtenida = response.rowCount > 0;
		console.log(response);
		if (respuestaObtenida) return { status: estados.EXITO };
		else return { status: estados.FRACASO };
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let eliminarDelCarrito = async infoProducto => {
	try {
		let response = await pool.query(querys.ELIMINAR_PRODUCTO_DEL_CARRITO.format(infoProducto));

		let filasModificadas = response.rowCount;
		let productoEliminado = filasModificadas > 0;
		return {
			status: productoEliminado ? estados.BORRADO : estados.FRACASO
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

let getComprasUsuario = async idUsuario => {
	try {
		let response = await pool.query(querys.GET_COMPRAS_USUARIO.format(idUsuario));

		let filasModificadas = response.rowCount;
		let tieneCompras = filasModificadas > 0;
		if (tieneCompras)
			return {
				status: estados.EXITO,
				compras: response.rows
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

/*
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
*/

module.exports = {
	//getCarritosByIdUsuario,
	//createCarrito,
	//desactivarCarrito,
	getCarritoActivo,
	añadirAlCarrito,
	getCantidadElementosCarrito,
	getProductosCarrito,
	realizarCheckout,
	eliminarDelCarrito,
	getComprasUsuario
};
