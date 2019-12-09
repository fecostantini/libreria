import {
	FETCH_LIBROS,
	UPDATE_LAST_REQUEST_STATUS,
	GET_VALORACION_LIBRO,
	VALORAR_LIBRO,
	GET_VALORACION_PROMEDIO_LIBRO
} from './types';
import estados from '../estados';
import axios from 'axios';
const URL = 'http://localhost:3210/libro';

export const fetchLibros = async dispatch => {
	const resp = await axios.get(URL);
	const libros = resp.data ? resp.data.libros : null;

	if (libros)
		dispatch({
			type: FETCH_LIBROS,
			payload: { libros }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const getValoracion = async (dispatch, infoValoracion) => {
	const resp = await axios.post(`${URL}/getPuntajeLibro`, infoValoracion);
	const puntuacion = resp.data ? resp.data.puntuacion : null;

	if (puntuacion)
		dispatch({
			type: GET_VALORACION_LIBRO,
			payload: { puntuacion }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const getValoracionPromedio = async (dispatch, isbn) => {
	const resp = await axios.post(`${URL}/getPuntajePromedio`, { isbn });
	const puntaje_promedio = resp.data ? resp.data.puntaje_promedio : null;

	if (puntaje_promedio)
		dispatch({
			type: GET_VALORACION_PROMEDIO_LIBRO,
			payload: { puntaje_promedio }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const valorarLibro = async (dispatch, infoValoracion) => {
	const resp = await axios.post(`${URL}/puntuarLibro`, infoValoracion);

	if (resp.data.status === estados.CREADO)
		dispatch({
			type: VALORAR_LIBRO,
			payload: { infoValoracion }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
