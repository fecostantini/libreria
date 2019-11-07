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
	console.log(action.type);

	switch (action.type) {
		case FETCH_AUTORES:
			const autores = action.payload;
			return {
				...state,
				items: autores
			};
		case CREATE_AUTOR:
			const autorCreado = action.payload;
			return {
				...state,
				items: [...state.items, autorCreado]
			};
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
