import { FETCH_CATEGORIAS, CREATE_CATEGORIA } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/autor';

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
};
