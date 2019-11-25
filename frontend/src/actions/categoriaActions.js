import { FETCH_CATEGORIAS, CREATE_CATEGORIA, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';

const URL = 'http://localhost:3210/categoria';

export const fetchCategorias = async dispatch => {
	const resp = await axios.get(URL);
	const categorias = resp.data ? resp.data.categorias : null;

	if (categorias)
		dispatch({
			type: FETCH_CATEGORIAS,
			payload: { categorias }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const createCategoria = async (dispatch, nuevaCategoria) => {
	const resp = await axios.post(URL, nuevaCategoria);
	const categoriaCreada = resp.data ? resp.data.categoria : null;

	if (categoriaCreada)
		dispatch({
			type: CREATE_CATEGORIA,
			payload: { categoriaCreada }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
