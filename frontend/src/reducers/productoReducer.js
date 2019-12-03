import { UPDATE_PRODUCTO_FORMULARIO, FETCH_PRODUCTOS, CREATE_PRODUCTO, RESET_PRODUCTO } from '../actions/types';

export const estadoInicialProducto = {
	productoActual: {
		titulo: null,
		stock: null,
		precio: null,
		id_promocion: null,
		descripcion: null,
		isbn: null,
		idioma: null,
		edicion: null,
		id_editorial: null,
		id_saga: null,
		autores: [],
		ids_autores: [],
		categorias: [],
		ids_categorias: []
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

		case CREATE_PRODUCTO:
			const productoCreado = action.payload.productoCreado;

			if (productoCreado)
				return {
					...state,
					items: [...state.items, productoCreado]
				};
			break;

		case RESET_PRODUCTO:
			return {
				...state,
				productoActual: { ...estadoInicialProducto.productoActual }
			};

		default:
			return state;
	}
}
