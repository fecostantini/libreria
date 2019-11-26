import { FETCH_EDITORIALES, CREATE_EDITORIAL } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_EDITORIALES:
			const editoriales = action.payload.editoriales;

			if (editoriales)
				return {
					...state,
					items: editoriales
				};

			break;

		case CREATE_EDITORIAL:
			const editorialCreada = action.payload.editorialCreada;

			if (editorialCreada)
				return {
					...state,
					items: [...state.items, editorialCreada]
				};
			break;

		default:
			return state;
	}
}
