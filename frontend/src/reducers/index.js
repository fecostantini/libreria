import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import autoresReducer from './autorReducer';
import categoriaReducer from './categoriaReducer';
import sagaReducer from './sagaReducer';

import productoReducer from './productoReducer';
import ultimaRequestReducer from './ultimaRequestReducer';

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		autores: autoresReducer,
		categorias: categoriaReducer,
		sagas: sagaReducer,
		producto: productoReducer,
		ultimaRequest: ultimaRequestReducer
	});

export default createRootReducer;
