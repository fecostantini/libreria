import { FETCH_LIBROS, UPDATE_LAST_REQUEST_STATUS } from './types';
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
