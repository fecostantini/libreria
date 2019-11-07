import { FETCH_AUTORES, CREATE_AUTOR } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	console.log(action.type);

	switch (action.type) {
		case FETCH_AUTORES:
			return {
				...state,
				items: action.payload
			};
		case CREATE_AUTOR:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		//TODO: UPDATE_AUTOR, DELETE_AUTOR
		default:
			return state;
	}
}
