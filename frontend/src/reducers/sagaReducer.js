import { FETCH_SAGAS, CREATE_SAGA } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_SAGAS:
			const sagas = action.payload.sagas;

			if (sagas)
				return {
					...state,
					items: sagas
				};

			break;

		case CREATE_SAGA:
			const sagaCreada = action.payload.sagaCreada;

			if (sagaCreada)
				return {
					...state,
					items: [...state.items, sagaCreada]
				};
			break;

		default:
			return state;
	}
}
