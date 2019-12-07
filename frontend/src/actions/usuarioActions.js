import { SET_USUARIO_ACTUAL, UPDATE_LAST_REQUEST_STATUS, UPDATE_USUARIO } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/usuario';

export const loggearORegistrarUsuario = async (dispatch, usuario) => {
	const resp = await axios.post(`${URL}/findOrCreateUsuario`, usuario);
	const usuarioRespuesta = resp.data ? resp.data.usuario : null;

	if (usuarioRespuesta) {
		// fuerza la actualización de la información del carrito
		if (resp.data.status === 'EXITO') document.location.reload();
		localStorage.setItem('usuarioActual', JSON.stringify(usuarioRespuesta));
		dispatch({
			type: SET_USUARIO_ACTUAL,
			payload: { usuarioActual: usuarioRespuesta }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const loggearUsuario = async (dispatch, usuario) => {
	const resp = await axios.post(`${URL}/getByMailAndPassword`, usuario);
	const usuarioRespuesta = resp.data ? resp.data.usuario : null;

	if (usuarioRespuesta) {
		// fuerza la actualización de la información del carrito
		if (resp.data.status === 'EXITO') document.location.reload();

		localStorage.setItem('usuarioActual', JSON.stringify(usuarioRespuesta));
		dispatch({
			type: SET_USUARIO_ACTUAL,
			payload: { usuarioActual: usuarioRespuesta }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const desloggearUsuario = async dispatch => {
	const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

	if (usuarioActual) {
		localStorage.setItem('usuarioActual', null);
		dispatch({
			type: SET_USUARIO_ACTUAL,
			payload: { usuarioActual: null }
		});
	}
};

export const registrarUsuario = async (dispatch, usuario) => {
	const resp = await axios.post(URL, usuario);
	const usuarioRespuesta = resp.data ? resp.data.usuario : null;

	if (usuarioRespuesta) {
		// fuerza la actualización de la información del carrito
		if (resp.data.status === 'EXITO') document.location.reload();
		localStorage.setItem('usuarioActual', JSON.stringify(usuarioRespuesta));
		dispatch({
			type: SET_USUARIO_ACTUAL,
			payload: { usuarioActual: usuarioRespuesta }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const updateUsuario = async (dispatch, usuarioCambiado) => {
	const resp = await axios.put(URL, usuarioCambiado);
	const usuarioActualizado = resp.data.status === 'ACTUALIZADO';

	if (usuarioActualizado) {
		// fuerza la actualización de la información del carrito
		if (resp.data.status === 'EXITO') document.location.reload();
		usuarioCambiado.nombre = usuarioCambiado.nombre.toUpperCase(); // poner nombre en mayuscula

		localStorage.setItem('usuarioActual', JSON.stringify(usuarioCambiado));
		dispatch({
			type: UPDATE_USUARIO,
			payload: usuarioCambiado
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
