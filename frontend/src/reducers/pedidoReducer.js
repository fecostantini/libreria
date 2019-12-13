import { FETCH_PEDIDOS, CREATE_PEDIDO, ACEPTAR_PEDIDO, RECHAZAR_PEDIDO, FETCH_PEDIDOS_USUARIO } from '../actions/types';

export const estadoInicialProducto = {
	pedidos_pagados: [],
	pedidos_sin_decidir: [],
	pedidos_usuario: []
};

export default function(state = estadoInicialProducto, action) {
	switch (action.type) {
		case FETCH_PEDIDOS:
			const tipoPedidos = action.payload.tipoPedidos;
			if (tipoPedidos === 'SIN_DECIDIR')
				return {
					...state,
					pedidos_sin_decidir: action.payload.pedidos
				};
			else if (tipoPedidos === 'PAGADOS')
				return {
					...state,
					pedidos_pagados: action.payload.pedidos
				};
			break;

		case FETCH_PEDIDOS_USUARIO:
			const pedidos = action.payload.pedidos;

			return {
				...state,
				pedidos_usuario: pedidos
			};
		case CREATE_PEDIDO:
			const pedidoCreado = action.payload.pedidoCreado;

			if (pedidoCreado)
				return {
					...state,
					pedidos_sin_decidir: [...state.pedidos_sin_decidir, pedidoCreado]
				};

			break;

		case ACEPTAR_PEDIDO:
			const idPedidoAceptado = action.payload.id_pedido;
			const pedidosSinElAceptado = state.pedidos_sin_decidir.filter(pedido => pedido.id_pedido !== idPedidoAceptado);

			return {
				...state,
				pedidos_sin_decidir: pedidosSinElAceptado
			};

		case RECHAZAR_PEDIDO:
			const idPedidoRechazado = action.payload.id_pedido;
			const pedidosSinElRechazado = state.pedidos_sin_decidir.filter(pedido => pedido.id_pedido !== idPedidoRechazado);

			return {
				...state,
				pedidos_sin_decidir: pedidosSinElRechazado
			};

		default:
			return state;
	}
}
