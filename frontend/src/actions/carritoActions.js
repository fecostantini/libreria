import { FETCH_CARRITO_ACTIVO, UPDATE_LAST_REQUEST_STATUS, FETCH_ELEMENTOS_CARRITO, AÑADIR_AL_CARRITO } from './types';
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

	if (resp.data.status === 'CREADO')
		dispatch({
			type: AÑADIR_AL_CARRITO,
			payload: { elemento: infoProducto }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const getElementos = async (dispatch, idCarrito) => {
	const resp = await axios.post(`${URL}/getElementos`, { id_carrito: idCarrito });
	console.log(resp.data.elementos);
	if (resp.data.status === 'EXITO')
		dispatch({
			type: FETCH_ELEMENTOS_CARRITO,
			payload: { elementos: resp.data.elementos }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
