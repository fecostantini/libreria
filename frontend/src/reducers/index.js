import { combineReducers } from 'redux';
import autoresReducer from './autorReducer';
import { connectRouter } from 'connected-react-router';

const createRootReducer = history =>
	combineReducers({
		router: connectRouter(history),
		autores: autoresReducer
	});

export default createRootReducer;
