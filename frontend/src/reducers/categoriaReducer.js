import { FETCH_CATEGORIAS, CREATE_CATEGORIA } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_CATEGORIAS:
			const categorias = action.payload.categorias;

			if (categorias)
				return {
					...state,
					items: categorias,
					status: action.payload.status
				};
			else
				return {
					...state,
					status: action.payload.status
				};

		case CREATE_CATEGORIA:
			const categoriaCreada = action.payload.categoriaCreada;

			if (categoriaCreada)
				return {
					...state,
					status: action.payload.status,
					items: [...state.items, categoriaCreada]
				};
			else
				return {
					...state,
					status: action.payload.status
				};

		default:
			return state;
	}
}
