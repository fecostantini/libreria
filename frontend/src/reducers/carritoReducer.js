import { FETCH_CARRITO_ACTIVO, FETCH_ELEMENTOS_CARRITO, AÑADIR_AL_CARRITO } from '../actions/types';

const initialState = {
	idCarritoActivo: 0,
	items: []
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

		default:
			return state;
	}
}
