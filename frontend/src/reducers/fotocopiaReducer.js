import { FETCH_FOTOCOPIAS } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_FOTOCOPIAS:
			const fotocopias = action.payload.fotocopias;

			if (fotocopias)
				return {
					...state,
					items: fotocopias
				};

			break;

		default:
			return state;
	}
}
