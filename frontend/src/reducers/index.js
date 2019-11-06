import { combineReducers } from 'redux';
import autoresReducer from './autorReducer';

export default combineReducers({
	autor: autoresReducer
});
