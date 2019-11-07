const pool = require('../database');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_ALL: 'select * from autor;',
	INSERT: String.raw`INSERT INTO autor("autor","nacionalidad") VALUES('{autor}','{nacionalidad}');`,
	UPDATE: String.raw`UPDATE autor SET autor = '{autor}', nacionalidad='{nacionalidad}' WHERE id_autor='{id_autor}';` //hay que pasar el objeto tal cual la bbdd
};

const errores = {
	AUTOR_YA_EXISTE: '23505',
	CONEXION_FALLIDA: 'ECONNREFUSED'
};

let getAutores = async () => {
	let response = await pool.query(querys.GET_ALL);
	let autores = response.rows;
	return autores;
};

// EXITO si lo inserta, AUTOR_YA_EXISTE si falla porque ya existe el autor, FRACASO si falla cualquier otra cosa (bbdd sin conexión, entre otras cosas).
let createAutor = async nuevoAutor => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevoAutor));
		let filasModificadas = response.rowCount;
		let autorIngresadoCorrectamente = filasModificadas > 0;
		return { status: autorIngresadoCorrectamente ? 'EXITO' : 'FRACASO' };
	} catch (error) {
		switch (error.code) {
			case errores.AUTOR_YA_EXISTE:
				return { status: 'AUTOR_YA_EXISTE' };
			case errores.CONEXION_FALLIDA:
				return { status: 'CONEXION_FALLIDA' };
			default:
				return { status: 'ERROR_DESCONOCIDO' };
		}
	}
};

// Devuelve true si lo actualiza , false si no lo actualiza
let updateAutor = async autorActualizado => {
	let response = await pool.query(querys.UPDATE.format(autorActualizado));
	let filasModificadas = response.rowCount;
	let autorActualizadoCorrectamente = filasModificadas > 0;
	return autorActualizadoCorrectamente;
};

module.exports = { getAutores, createAutor, updateAutor };
