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
					items: categorias
				};

		case CREATE_CATEGORIA:
			const categoriaCreada = action.payload.categoriaCreada;

			if (categoriaCreada)
				return {
					...state,
					items: [...state.items, categoriaCreada]
				};

		default:
			return state;
	}
}
