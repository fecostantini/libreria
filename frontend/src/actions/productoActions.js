import { UPDATE_PRODUCTO_FORMULARIO } from './types';

export const updateProducto = async (dispatch, productoActualizado) => {
	dispatch({ type: UPDATE_PRODUCTO_FORMULARIO, payload: productoActualizado });
};
