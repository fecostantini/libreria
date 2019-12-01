import { FETCH_LIBROS } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_LIBROS:
			const libros = action.payload.libros;

			if (libros)
				return {
					...state,
					items: libros
				};

			break;

		default:
			return state;
	}
}
