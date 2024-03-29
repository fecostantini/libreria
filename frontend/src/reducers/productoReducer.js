import {
	UPDATE_PRODUCTO_FORMULARIO,
	FETCH_PRODUCTOS,
	FETCH_PRODUCTO,
	CREATE_PRODUCTO,
	RESET_PRODUCTO,
	DELETE_PRODUCTO
} from '../actions/types';

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
		ids_categorias: [],
		imagen: ''
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

		case FETCH_PRODUCTO:
			const producto = action.payload.producto;

			if (producto)
				return {
					...state,
					productoActual: producto
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

		case DELETE_PRODUCTO:
			const idBorrado = action.payload.id_producto;
			// eslint-disable-next-line
			const productosSinElBorrado = state.items.filter(producto => {
				if (producto.id_producto !== idBorrado) return producto;
			});
			return {
				...state,
				items: productosSinElBorrado
			};

		default:
			return state;
	}
}
