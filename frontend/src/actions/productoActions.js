import {
	UPDATE_PRODUCTO_FORMULARIO,
	FETCH_PRODUCTOS,
	FETCH_PRODUCTO,
	CREATE_PRODUCTO,
	UPDATE_LAST_REQUEST_STATUS,
	RESET_PRODUCTO,
	DELETE_PRODUCTO
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

export const fetchProducto = async (dispatch, id_producto) => {
	const resp = await axios.post(`${URL}/getInfo`, { id_producto });
	const producto = resp.data ? resp.data.producto : null;

	if (producto)
		dispatch({
			type: FETCH_PRODUCTO,
			payload: { producto }
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

export const deleteProducto = async (dispatch, idProductoABorrar) => {
	const resp = await axios.delete(URL, { data: { id_producto: idProductoABorrar } });
	const productoBorrado = resp.data ? true : false;

	if (productoBorrado) {
		dispatch({
			type: DELETE_PRODUCTO,
			payload: { id_producto: idProductoABorrar }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
