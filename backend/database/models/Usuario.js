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
	GET_BY_GOOGLE_ID: `select * from usuario where id_google='{}';`,
	GET_BY_MAIL: `select * from usuario where mail='{}';`,
	GET_ALL: 'select * from usuario;',
	INSERT: String.raw`INSERT INTO usuario("id_facebook", "id_google",  "mail","nombre", "apellido", "password", "imagen") VALUES('{id_facebook}', '{id_google}', '{mail}','{nombre}','{apellido}','{password}', '{imagen}') RETURNING id_usuario;`,
	INSERT_FACEBOOK: String.raw`INSERT INTO usuario("id_facebook", "nombre", "mail", "imagen") VALUES('{id_facebook}','{nombre}', '{mail}', '{imagen}') RETURNING id_usuario;`,
	INSERT_GOOGLE: String.raw`INSERT INTO usuario("id_google", "nombre", "mail", "imagen") VALUES('{id_google}','{nombre}', '{mail}', '{imagen}') RETURNING id_usuario;`,
	UPDATE: String.raw`UPDATE usuario SET mail = '{mail}', id_facebook='{id_facebook}' nombre='{nombre}', apellido='{apellido}', password='{password}', rol='{rol}' WHERE id_usuario='{id_usuario}';`
};

// si se le pasa un tipoID e id buscará el usuario correspondiendo a esa información
// si no se pasa ningun tipoID, se asume que se quieren todas las tuplas de usuario.
let getUsuarios = async () => {
	try {
		let response = await pool.query(querys.GET_ALL);
		let usuarios = response.rows;

		if (usuarios.length)
			return {
				status: estados.EXITO,
				usuarios: response.rows
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

let getUsuarioByFacebookId = async id => {
	try {
		let response = await pool.query(querys.GET_BY_FACEBOOK_ID.format(id));
		let usuarioEncontrado = response.rows.length > 0;

		if (usuarioEncontrado) {
			return {
				status: estados.EXITO,
				usuario: response.rows[0]
			};
		} else return { status: estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let getUsuarioByGoogleId = async id => {
	try {
		let response = await pool.query(querys.GET_BY_GOOGLE_ID.format(id));
		let usuarioEncontrado = response.rows.length > 0;

		if (usuarioEncontrado) {
			return {
				status: estados.EXITO,
				usuario: response.rows[0]
			};
		} else return { status: estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let getUsuarioById = async id => {
	try {
		console.log(querys.GET_BY_NORMAL_ID.format(id));
		let response = await pool.query(querys.GET_BY_NORMAL_ID.format(id));
		let usuarioEncontrado = response.rows.length > 0;

		if (usuarioEncontrado) {
			return {
				status: estados.EXITO,
				usuario: response.rows[0]
			};
		} else return { status: estados.FRACASO };
	} catch (error) {
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let getUsuarioByMailAndPassword = async usuarioBuscado => {
	try {
		let response = await pool.query(querys.GET_BY_MAIL.format(usuarioBuscado.mail));
		let usuarioEncontrado = response.rows.length > 0;

		if (usuarioEncontrado) {
			const usuarioResponse = response.rows[0];
			if (usuarioResponse.password === usuarioBuscado.password)
				return { status: estados.EXITO, usuario: usuarioResponse };
			else return { status: estados.CONTRASEÑA_INCORRECTA };
		} else return { status: estados.FRACASO };
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
		console.log(nuevoUsuario);
		let usuario = { id_facebook: '', id_google: '', mail: '', nombre: '', apellido: '', password: '' };
		nuevoUsuario = { ...usuario, ...nuevoUsuario }; // si nuevoUsuario viene incompleto tendrá al menos los valores vacíos
		console.log(nuevoUsuario);
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

let findOrCreateUsuario = async nuevoUsuario => {
	try {
		let response;

		if (nuevoUsuario.id_facebook) response = await getUsuarioByFacebookId(nuevoUsuario.id_facebook);
		else if (nuevoUsuario.id_google) response = await getUsuarioByGoogleId(nuevoUsuario.id_google);

		if (response.usuario)
			return {
				status: estados.EXITO,
				usuario: response.usuario
			};
		else return await createUsuario(nuevoUsuario);
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
	getUsuarios,
	createUsuario,
	getUsuarioById,
	getUsuarioByFacebookId,
	findOrCreateUsuario,
	getUsuarioByMailAndPassword
};
