import {
	FETCH_CARRITO_ACTIVO,
	UPDATE_LAST_REQUEST_STATUS,
	FETCH_ELEMENTOS_CARRITO,
	AÑADIR_AL_CARRITO,
	REALIZAR_CHECKOUT,
	ELIMINAR_DEL_CARRITO
} from './types';

import estados from '../estados';
import axios from 'axios';

const URL = 'http://localhost:3210/carrito';

export const fetchCarritoActivo = async (dispatch, idUsuario) => {
	const resp = await axios.post(`${URL}/getCarritoActivo`, { id_usuario: idUsuario });
	const id_carrito = resp.data ? resp.data.id_carrito : null;

	if (id_carrito)
		dispatch({
			type: FETCH_CARRITO_ACTIVO,
			payload: { id_carrito }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const añadirAlCarrito = async (dispatch, infoProducto) => {
	const resp = await axios.post(`${URL}/agregarProducto`, infoProducto);

	if (resp.data.status === estados.CREADO)
		dispatch({
			type: AÑADIR_AL_CARRITO,
			payload: { elemento: infoProducto }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const eliminarDelCarrito = async (dispatch, infoProducto) => {
	const resp = await axios.post(`${URL}/eliminarProducto`, infoProducto);

	if (resp.data.status === estados.BORRADO)
		dispatch({
			type: ELIMINAR_DEL_CARRITO,
			payload: { id_producto: infoProducto.id_producto }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const getElementos = async (dispatch, idCarrito) => {
	const resp = await axios.post(`${URL}/getElementos`, { id_carrito: idCarrito });
	if (resp.data.status === estados.EXITO)
		dispatch({
			type: FETCH_ELEMENTOS_CARRITO,
			payload: { elementos: resp.data.elementos }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const realizarCheckout = async (dispatch, idCarrito, idUsuario) => {
	const resp = await axios.post(`${URL}/realizarCheckout`, { id_carrito: idCarrito });
	if (resp.data.status === estados.EXITO) {
		dispatch({ type: REALIZAR_CHECKOUT });
		dispatch({
			type: UPDATE_LAST_REQUEST_STATUS,
			payload: { status: resp.data.status }
		});

		await fetchCarritoActivo(dispatch, idUsuario);
	}
};
