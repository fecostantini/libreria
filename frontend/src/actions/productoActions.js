import { UPDATE_PRODUCTO_FORMULARIO, FETCH_PRODUCTOS, UPDATE_LAST_REQUEST_STATUS } from './types';
import axios from 'axios';
const URL = 'http://localhost:3210/producto';

export const updateProducto = async (dispatch, productoActualizado) => {
	dispatch({ type: UPDATE_PRODUCTO_FORMULARIO, payload: productoActualizado });
};

export const fetchProductos = async dispatch => {
	const resp = await axios.get(URL);
	const productos = resp.data ? resp.data.productos : null;

	if (productos)
		dispatch({
			type: FETCH_PRODUCTOS,
			payload: { productos }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
