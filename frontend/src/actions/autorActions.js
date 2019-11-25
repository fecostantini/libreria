import {
	FETCH_AUTORES,
	CREATE_AUTOR,
	DELETE_AUTOR,
	UPDATE_AUTOR,
	UPDATE_LAST_REQUEST_STATUS
} from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/autor';

export const fetchAutores = async dispatch => {
	const resp = await axios.get(URL);
	const autores = resp.data ? resp.data.autores : null;

	if (autores) {
		dispatch({
			type: FETCH_AUTORES,
			payload: { autores }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const createAutor = async (dispatch, nuevoAutor) => {
	const resp = await axios.post(URL, nuevoAutor);
	const autorCreado = resp.data ? resp.data.autor : null;

	if (autorCreado) {
		dispatch({
			type: CREATE_AUTOR,
			payload: { autorCreado }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const deleteAutor = idAutorABorrar => dispatch => {
	const autorABorrar = { id_autor: idAutorABorrar };
	axios.delete(URL, { data: autorABorrar }).then(resp => {
		const autorBorrado = resp.data.status === 'EXITO';
		console.log(resp.data.status);
		if (autorBorrado) {
			dispatch({
				type: DELETE_AUTOR,
				payload: { idBorrado: idAutorABorrar }
			});
		}
	});
};

export const updateAutor = autorActualizado => dispatch => {
	axios.put(URL, autorActualizado).then(resp => {
		const autorActualizado = resp.data.status === 'EXITO';

		if (autorActualizado) {
			dispatch({
				type: UPDATE_AUTOR,
				payload: autorActualizado
			});
		}
	});
};
