import {
	FETCH_CARRITO_ACTIVO,
	FETCH_ELEMENTOS_CARRITO,
	AÑADIR_AL_CARRITO,
	REALIZAR_CHECKOUT,
	ELIMINAR_DEL_CARRITO,
	FETCH_COMPRAS_USUARIO
} from '../actions/types';

const initialState = {
	idCarritoActivo: 0,
	items: [],
	compras: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_CARRITO_ACTIVO:
			const idCarritoActivo = action.payload.id_carrito;

			if (idCarritoActivo)
				return {
					...state,
					idCarritoActivo
				};
			break;

		case FETCH_ELEMENTOS_CARRITO:
			const elementos = action.payload.elementos;

			if (elementos)
				return {
					...state,
					items: elementos
				};
			break;

		case AÑADIR_AL_CARRITO:
			const elemento = action.payload.elemento;

			if (elemento)
				return {
					...state,
					items: [...state.items, elemento]
				};
			break;

		case ELIMINAR_DEL_CARRITO:
			const idProductoEliminado = action.payload.id_producto;
			const itemsSinElEliminado = state.items.filter(producto => producto.id_producto !== idProductoEliminado);
			if (idProductoEliminado)
				return {
					...state,
					items: itemsSinElEliminado
				};
			break;

		case REALIZAR_CHECKOUT:
			return {
				...state,
				items: []
			};

		case FETCH_COMPRAS_USUARIO:
			const comprasUsuario = action.payload.compras;

			return {
				...state,
				compras: comprasUsuario
			};

		default:
			return state;
	}
}
