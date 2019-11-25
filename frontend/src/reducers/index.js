import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import autoresReducer from './autorReducer';
import categoriaReducer from './categoriaReducer';
import ultimaRequestReducer from './ultimaRequestReducer';

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		autores: autoresReducer,
		categorias: categoriaReducer,
		ultimaRequest: ultimaRequestReducer
	});

export default createRootReducer;
