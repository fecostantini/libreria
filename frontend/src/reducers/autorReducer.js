import {
	FETCH_AUTORES,
	CREATE_AUTOR,
	DELETE_AUTOR,
	UPDATE_AUTOR
} from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_AUTORES:
			const autores = action.payload.autores;

			if (autores)
				return {
					...state,
					items: autores
				};
			break;

		case CREATE_AUTOR:
			const autorCreado = action.payload.autorCreado;

			if (autorCreado)
				return {
					...state,
					items: [...state.items, autorCreado]
				};
			break;

		case DELETE_AUTOR:
			const idBorrado = action.payload.idBorrado;
			// eslint-disable-next-line
			const autoresSinElBorrado = state.items.filter(autor => {
				if (autor.id_autor !== idBorrado) return autor;
			});
			return {
				...state,
				items: autoresSinElBorrado
			};
		case UPDATE_AUTOR:
			const autorActualizado = action.payload;
			const autoresActualizado = state.items.map(autor => {
				return autor.id_autor === autorActualizado.id_autor
					? autorActualizado
					: autor;
			});
			return {
				...state,
				items: autoresActualizado
			};
		default:
			return state;
	}
}
