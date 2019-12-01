import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import autoresReducer from './autorReducer';
import categoriaReducer from './categoriaReducer';
import sagaReducer from './sagaReducer';
import editorialReducer from './editorialReducer';
import promocionReducer from './promocionReducer';
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
		usuario: usuarioReducer,
		producto: productoReducer,
		ultimaRequest: ultimaRequestReducer
	});

export default createRootReducer;
