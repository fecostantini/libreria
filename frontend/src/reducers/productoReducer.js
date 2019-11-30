import { UPDATE_PRODUCTO_FORMULARIO } from '../actions/types';

export const estadoInicialProducto = {
	titulo: '',
	stock: 0,
	precio: 0,
	descuento: '',
	descripcion: '',
	isbn: 0,
	idioma: '',
	edicion: '',
	editorial: null,
	saga: null,
	autores: [],
	categorias: []
};

export default function(state = estadoInicialProducto, action) {
	switch (action.type) {
		case UPDATE_PRODUCTO_FORMULARIO:
			return {
				...state,
				...action.payload
			};

		default:
			return state;
	}
}
