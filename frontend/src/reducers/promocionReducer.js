import { FETCH_PROMOCIONES } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_PROMOCIONES:
			const promociones = action.payload.promociones;

			if (promociones)
				return {
					...state,
					items: promociones
				};

			break;

		default:
			return state;
	}
}
