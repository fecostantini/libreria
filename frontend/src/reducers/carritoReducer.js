import { FETCH_CARRITO_ACTIVO } from '../actions/types';

const initialState = {
	idCarritoActivo: 0
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

		default:
			return state;
	}
}
