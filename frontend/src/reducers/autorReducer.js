import { FETCH_AUTORES, POST_AUTORES } from '../actions/types';

const initialState = {
	items: [],
	autor: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_AUTORES:
			console.log('reduciendo...');
			return {
				...state,
				items: action.payload
			};
		default:
			return state;
	}
}
