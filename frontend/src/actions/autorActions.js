import {
	FETCH_AUTORES,
	CREATE_AUTOR,
	DELETE_AUTOR,
	UPDATE_AUTOR
} from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/autor';

export const fetchAutores = async dispatch => {
	var dispatchContent = { type: FETCH_AUTORES };

	const resp = await axios.get(URL);
	const autores = resp.data ? resp.data.autores : null;

	if (autores) {
		dispatchContent = {
			...dispatchContent,
			payload: { autores, status: resp.data.status }
		};
	} else {
		dispatchContent = {
			...dispatchContent,
			payload: { status: resp.data.status }
		};
	}

	dispatch(dispatchContent);
};

/*
export const createAutor = nuevoAutor => dispatch => {
	axios.post(URL, nuevoAutor).then(resp => {
		const autorCreado = resp.data.status === 'EXITO';
		if (autorCreado) {
			dispatch({
				type: CREATE_AUTOR,
				payload: resp.data.autor
			});
		}
	});
};
*/

export const createAutor = async (dispatch, nuevoAutor) => {
	var dispatchContent = { type: CREATE_AUTOR };

	const resp = await axios.post(URL, nuevoAutor);
	const autorCreado = resp.data ? resp.data.autor : null;

	if (autorCreado) {
		dispatchContent = {
			...dispatchContent,
			payload: { autorCreado, status: resp.data.status }
		};
	} else {
		dispatchContent = {
			...dispatchContent,
			payload: { status: resp.data.status }
		};
	}

	dispatch(dispatchContent);
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
