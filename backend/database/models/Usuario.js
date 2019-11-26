const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const tiposID = {
	NORMAL: 'NORMAL',
	FACEBOOK: 'FACEBOOK'
};
const querys = {
	GET_BY_NORMAL_ID: 'select * from usuario where id_usuario={};',
	GET_BY_FACEBOOK_ID: `select * from usuario where id_facebook='{}';`,
	GET_ALL: 'select * from usuario;',
	INSERT: String.raw`INSERT INTO usuario("id_facebook", "mail","nombre", "apellido", "password", "rol") VALUES('{id_facebook}', '{mail}','{nombre}','{apellido}','{password}','{rol}') RETURNING id_usuario;`,
	UPDATE: String.raw`UPDATE usuario SET mail = '{mail}', id_facebook='{id_facebook}' nombre='{nombre}', apellido='{apellido}', password='{password}', rol='{rol}' WHERE id_usuario='{id_usuario}';`
};

// si se le pasa un tipoID e id buscará el usuario correspondiendo a esa información
// si no se pasa ningun tipoID, se asume que se quieren todas las tuplas de usuario.
let getUsuarios = async (tipoID, id) => {
	try {
		let query;

		if (tipoID === tiposID.NORMAL) query = querys.GET_BY_NORMAL_ID;
		else if (tipoID === tiposID.FACEBOOK) query = querys.GET_BY_FACEBOOK_ID;
		else query = querys.GET_ALL; // asumimos que quiere todas las tuplas

		console.log(query.format(id));
		let response = await pool.query(query.format(id));
		let usuario = response.rows;

		return {
			status: usuario ? estados.EXITO : estados.FRACASO,
			usuario: response.rows[0],
			usuarios: response.rows
		};
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let createUsuario = async nuevoUsuario => {
	try {
		let response = await pool.query(querys.INSERT.format(nuevoUsuario));
		let filasModificadas = response.rowCount;
		let usuarioCreado = filasModificadas > 0;

		if (usuarioCreado) {
			const idUsuarioCreado = response.rows[0].id_usuario;
			return {
				status: estados.CREADO,
				usuario: { ...nuevoUsuario, id_usuario: idUsuarioCreado }
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

module.exports = { getUsuarios, createUsuario };
