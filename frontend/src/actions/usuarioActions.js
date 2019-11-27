import { FETCH_USUARIO_FACEBOOK, SET_USUARIO_ACTUAL, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/usuario';

export const fetchUsuarioByFacebookId = async (dispatch, facebookId) => {
	const resp = await axios.get(`${URL}/getByFacebookId`, { data: { id: facebookId } });

	const usuario = resp.data ? resp.data.usuario : null;

	if (usuario)
		dispatch({
			type: FETCH_USUARIO_FACEBOOK,
			payload: { usuario }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const loggearUsuario = async (dispatch, usuario) => {
	const resp = await axios.post(`${URL}/findOrCreateUsuario`, usuario);
	const usuarioRespuesta = resp.data ? resp.data.usuario : null;

	if (usuarioRespuesta) {
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
