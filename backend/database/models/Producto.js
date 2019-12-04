const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

var formatearArray = array => {
	let arrayStr = String.raw``;
	if (array) {
		array.forEach((elemento, i) => {
			arrayStr += String.raw`${elemento}`;
			if (i + 1 !== array.length) arrayStr += String.raw`,`;
		});
	}

	return arrayStr;
};

const querys = {
	GET_ALL: 'select * from producto;',
	INSERT: String.raw`call new_producto({isbn}, '{idioma}', '{titulo}', {stock}, {precio}, '{edicion}', '{descripcion}', {id_editorial}, {id_saga}, {id_promocion}, array[{ids_autores}]::int[], array[{ids_categorias}]::int[], {id_usuario});`,
	GET_INFO: String.raw`select * from datos_producto({});`,
	DELETE: String.raw`` //TODO: Llamar funcion que borra al producto y todas sus relaciones intermedias (en caso de ser libro)
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

let createProducto = async nuevoProducto => {
	try {
		// Formatea los arrays de manera que se pueda formatear la consulta
		const nuevoProductoFormateado = {
			...nuevoProducto,
			autores: formatearArray(nuevoProducto.autores),
			categorias: formatearArray(nuevoProducto.categorias)
		};
		console.log(querys.INSERT.format(nuevoProductoFormateado));
		let response = await pool.query(querys.INSERT.format(nuevoProductoFormateado));

		if (response) {
			return {
				status: estados.EXITO
			};
		}
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

let getDatosProducto = async idProducto => {
	try {
		let response = await pool.query(querys.GET_INFO.format(idProducto));

		if (response.rows) {
			return {
				status: estados.EXITO,
				producto: response.rows[0]
			};
		}
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
	getProductos,
	createProducto,
	getDatosProducto
};
