import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import autoresReducer from './autorReducer';
import categoriaReducer from './categoriaReducer';
import sagaReducer from './sagaReducer';
import editorialReducer from './editorialReducer';
import promocionReducer from './promocionReducer';
import libroReducer from './libroReducer';
import fotocopiaReducer from './fotocopiaReducer';
import carritoReducer from './carritoReducer';
import usuarioReducer from './usuarioReducer';

import productoReducer from './productoReducer';
import ultimaRequestReducer from './ultimaRequestReducer';

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		autores: autoresReducer,
		categorias: categoriaReducer,
		sagas: sagaReducer,
		editoriales: editorialReducer,
		promociones: promocionReducer,
		libros: libroReducer,
		fotocopias: fotocopiaReducer,
		carrito: carritoReducer,
		usuario: usuarioReducer,
		producto: productoReducer,
		ultimaRequest: ultimaRequestReducer
	});

export default createRootReducer;
