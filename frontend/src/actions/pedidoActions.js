import {
	FETCH_PEDIDOS,
	CREATE_PEDIDO,
	ACEPTAR_PEDIDO,
	RECHAZAR_PEDIDO,
	FETCH_PEDIDOS_USUARIO,
	SET_FECHA_LLEGADA_PEDIDO,
	UPDATE_LAST_REQUEST_STATUS
} from './types';
import axios from 'axios';
import estados from '../estados';

const URL = 'http://localhost:3210/pedido';

export const fetchPedidos = async (dispatch, tipoPedidos) => {
	const resp = await axios.post(`${URL}/getPedidos`, { tipo_pedidos: tipoPedidos });
	const pedidos = resp.data ? resp.data.pedidos : null;

	if (pedidos) {
		dispatch({
			type: FETCH_PEDIDOS,
			payload: { pedidos, tipoPedidos }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const fetchPedidosUsuario = async (dispatch, idUsuario) => {
	const resp = await axios.post(`${URL}/getPedidosUsuario`, { id_usuario: idUsuario });
	const pedidos = resp.data ? resp.data.pedidos : null;

	if (pedidos) {
		dispatch({
			type: FETCH_PEDIDOS_USUARIO,
			payload: { pedidos }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const createPedido = async (dispatch, nuevoPedido) => {
	const resp = await axios.post(`${URL}/nuevoPedido`, nuevoPedido);
	const pedidoCreado = resp.data ? resp.data.pedido : null;

	if (pedidoCreado) {
		dispatch({
			type: CREATE_PEDIDO,
			payload: { pedidoCreado }
		});
	}

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const aceptarORechazarPedido = async (dispatch, infoPedido) => {
	const resp = await axios.put(`${URL}/aceptarORechazarPedido`, infoPedido);

	const pedidoActualizado = resp.data.status === estados.ACTUALIZADO;

	if (pedidoActualizado)
		dispatch({
			type: infoPedido.decision === 'ACEPTAR' ? ACEPTAR_PEDIDO : RECHAZAR_PEDIDO,
			payload: { id_pedido: infoPedido.id_pedido }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const pagarPedido = async (dispatch, idPedido) => {
	const resp = await axios.put(`${URL}/pagarPedido`, { id_pedido: idPedido });

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};

export const setFechaLlegada = async (dispatch, idPedido, fechaLlegada) => {
	const resp = await axios.put(`${URL}/setFechaLlegada`, { id_pedido: idPedido, fecha_llegada: fechaLlegada });

	if (resp.data.status === estados.ACTUALIZADO)
		dispatch({
			type: SET_FECHA_LLEGADA_PEDIDO,
			payload: { id_pedido: idPedido, fecha_llegada: fechaLlegada }
		});

	dispatch({
		type: UPDATE_LAST_REQUEST_STATUS,
		payload: { status: resp.data.status }
	});
};
