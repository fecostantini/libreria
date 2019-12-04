import { FETCH_CARRITO_ACTIVO, UPDATE_LAST_REQUEST_STATUS } from './types';
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

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
