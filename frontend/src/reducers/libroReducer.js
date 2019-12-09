import { FETCH_LIBROS, GET_VALORACION_LIBRO, VALORAR_LIBRO, GET_VALORACION_PROMEDIO_LIBRO } from '../actions/types';

const initialState = {
	items: [],
	valoracionesLibroActual: [],
	valoracionPromedioLibroActual: 0,
	valoracionLibroActual: null
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

		case GET_VALORACION_LIBRO:
			const puntuacion = action.payload.puntuacion;

			if (puntuacion)
				return {
					...state,
					valoracionLibroActual: { ...puntuacion }
				};

			break;

		case VALORAR_LIBRO:
			const infoValoracion = action.payload.infoValoracion;

			if (infoValoracion)
				return {
					...state,
					valoracionesLibroActual: [...state.valoracionesLibroActual, infoValoracion],
					valoracionLibroActual: { ...infoValoracion }
				};

			break;

		case GET_VALORACION_PROMEDIO_LIBRO:
			const valoracionPromedio = action.payload.puntaje_promedio;

			if (valoracionPromedio)
				return {
					...state,
					valoracionPromedioLibroActual: valoracionPromedio
				};

			break;

		default:
			return state;
	}
}
