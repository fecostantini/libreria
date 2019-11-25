import {
	FETCH_CATEGORIAS,
	CREATE_CATEGORIA,
	UPDATE_LAST_REQUEST_STATUS
} from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/categoria';

export const fetchCategorias = async dispatch => {
	var dispatchContent = { type: FETCH_CATEGORIAS };

	const resp = await axios.get(URL);
	const categorias = resp.data ? resp.data.categorias : null;

	if (categorias) {
		dispatchContent = {
			...dispatchContent,
			payload: { categorias, status: resp.data.status }
		};
	} else {
		dispatchContent = {
			...dispatchContent,
			payload: { status: resp.data.status }
		};
	}

	dispatch(dispatchContent);
	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const createCategoria = async (dispatch, nuevaCategoria) => {
	var dispatchContent = { type: CREATE_CATEGORIA };

	const resp = await axios.post(URL, nuevaCategoria);
	const categoriaCreada = resp.data ? resp.data.categoria : null;

	if (categoriaCreada) {
		dispatchContent = {
			...dispatchContent,
			payload: { categoriaCreada, status: resp.data.status }
		};
	} else {
		dispatchContent = {
			...dispatchContent,
			payload: { status: resp.data.status }
		};
	}

	dispatch(dispatchContent);
	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
