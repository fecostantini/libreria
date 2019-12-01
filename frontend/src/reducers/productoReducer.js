import { UPDATE_PRODUCTO_FORMULARIO, FETCH_PRODUCTOS } from '../actions/types';

export const estadoInicialProducto = {
	productoActual: {
		titulo: '',
		stock: 0,
		precio: 0,
		promocion: null,
		descripcion: '',
		isbn: 0,
		idioma: '',
		edicion: '',
		editorial: null,
		saga: null,
		autores: [],
		categorias: []
	},
	items: []
};

export default function(state = estadoInicialProducto, action) {
	switch (action.type) {
		case UPDATE_PRODUCTO_FORMULARIO:
			return {
				...state,
				productoActual: { ...action.payload }
			};

		case FETCH_PRODUCTOS:
			const productos = action.payload.productos;

			if (productos)
				return {
					...state,
					items: productos
				};

			break;
		default:
			return state;
	}
}
