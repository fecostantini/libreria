import {
	UPDATE_PRODUCTO_FORMULARIO,
	FETCH_PRODUCTOS,
	CREATE_PRODUCTO,
	UPDATE_LAST_REQUEST_STATUS,
	RESET_PRODUCTO
} from './types';
import axios from 'axios';
const URL = 'http://localhost:3210/producto';

export const updateProducto = async (dispatch, productoActualizado) => {
	dispatch({ type: UPDATE_PRODUCTO_FORMULARIO, payload: productoActualizado });
};

export const resetProducto = async dispatch => {
	dispatch({ type: RESET_PRODUCTO });
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

export const createProducto = async (dispatch, nuevoProducto) => {
	const resp = await axios.post(URL, nuevoProducto);
	const productoCreado = resp.data ? resp.data.producto : null;

	if (productoCreado) {
		dispatch({
			type: CREATE_PRODUCTO,
			payload: { productoCreado }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
