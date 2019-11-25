import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router';

import autoresReducer from './autorReducer';
import categoriaReducer from './categoriaReducer';

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		autores: autoresReducer,
		categorias: categoriaReducer
	});

export default createRootReducer;
