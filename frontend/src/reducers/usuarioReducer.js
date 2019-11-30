import { FETCH_USUARIO_FACEBOOK, SET_USUARIO_ACTUAL, UPDATE_USUARIO } from '../actions/types';

const usuarioActualLocalStorage = JSON.parse(localStorage.getItem('usuarioActual'));

const initialState = {
	usuarioActual: usuarioActualLocalStorage ? usuarioActualLocalStorage : null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_USUARIO_ACTUAL:
			const usuarioActual = action.payload.usuarioActual;
			return {
				...state,
				usuarioActual
			};

		case UPDATE_USUARIO:
			const usuarioActualizado = action.payload;

			if (usuarioActualizado)
				return {
					...state,
					usuarioActual: usuarioActualizado
				};
			break;

		default:
			return state;
	}
}
