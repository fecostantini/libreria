const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from producto;',
	INSERT: String.raw`call new_producto({isbn}, '{idioma}', '{titulo}', {stock}, {precio}, '{edicion}', '{descripcion}', {id_editorial}, {id_saga}, {id_promocion}, array[{ids_autores}]::int[], array[{ids_categorias}]::int[], {id_usuario}, '{imagen}');`,
	UPDATE: String.raw`call update_producto({id_fotocopia}, {isbn}, '{idioma}', '{titulo}', {stock}, {precio}, '{edicion}', '{descripcion}', {id_editorial}, {id_saga}, {id_promocion}, array[{ids_autores}]::int[], array[{ids_categorias}]::int[], {id_usuario}, '{imagen}');`,
	GET_INFO: String.raw`select * from datos_producto({});`,
	DELETE: String.raw`call delete_producto({});` //TODO: Llamar funcion que borra al producto y todas sus relaciones intermedias (en caso de ser libro)
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
		console.log(nuevoProducto);
		const imagen =
			nuevoProducto.imagen !== ''
				? nuevoProducto.imagen
				: 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png';
		nuevoProducto = { ...nuevoProducto, imagen };

		console.log(querys.INSERT.format(nuevoProducto));
		let response = await pool.query(querys.INSERT.format(nuevoProducto));

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

let deleteProducto = async idProducto => {
	try {
		let response = await pool.query(querys.DELETE.format(idProducto));
		if (response) return { id_producto: idProducto, status: estados.BORRADO };
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

let updateProducto = async productoActualizado => {
	try {
		const imagen =
			productoActualizado.imagen !== ''
				? productoActualizado.imagen
				: 'https://cdn.pixabay.com/photo/2014/03/25/16/31/book-297246_960_720.png';
		productoActualizado = { ...productoActualizado, imagen };

		console.log(querys.UPDATE.format(productoActualizado));
		let response = await pool.query(querys.UPDATE.format(productoActualizado));

		if (response) return { status: estados.ACTUALIZADO };
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

module.exports = {
	getProductos,
	createProducto,
	getDatosProducto,
	deleteProducto,
	updateProducto
};
